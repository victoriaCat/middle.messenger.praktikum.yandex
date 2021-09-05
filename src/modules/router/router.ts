import Block, {renderBlock} from '../block/block';
import {ActionTypes, store} from '../store';
import {auth} from '../../api/authAPI';

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

const PUBLIC_ROUTES = ['/', '/sign_in', '/404', '/500'];

class Route {
    private _pathname: string;
    readonly _blockClass: any;
    private _block: Block | null;
    private _props: { [key: string]: any };

    constructor(pathname: string, view: any, props: {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = new this._blockClass();
        renderBlock(this._props.rootQuery, this._block!);
    }
}

export class Router {
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;
    private static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes!.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    async _onRoute(pathname: string) {
        if (!PUBLIC_ROUTES.includes(pathname)) {
            try {
                const userInfo = await auth.getUserInfo();
                store.dispatchAction(ActionTypes.GET_CURRENT_USER, userInfo);
            } catch (e) {
                return this.go('/');
            }
        }
        const route = this.getRoute(pathname);

        if (!route) {
            return this.go('/404');
        }

        store.unsubscribeAll();

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route!.render();
    }

    go(pathname: string) {
        this.history!.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history!.back();
        this._onRoute(window.location.pathname);
    }

    forward() {
        this.history!.forward();
        this._onRoute(window.location.pathname);
    }

    getRoute(pathname: string) {
        return this.routes!.find(route => route.match(pathname));
    }
}
