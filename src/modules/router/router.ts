import Block, {renderBlock} from '../block';
import {LogIn} from '../../blocks/logIn/logIn';
import {SignIn} from '../../blocks/signIn/signIn';
import {ChangePassword} from '../../blocks/changePassword/changePassword';
import {ChangeProfileInfo} from '../../blocks/changeProfileInfo/changeProfileInfo';
import {Chats} from '../../blocks/chats/chats';
import {ChatWindow} from '../../blocks/chatWindow/chatWindow';
import {Profile} from '../../blocks/profile/profile';
import {Error404} from '../../blocks/errorPage/error404';
import {Error500} from '../../blocks/errorPage/error500';

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

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

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = new this._blockClass();
        renderBlock(this._props.rootQuery, this._block!);
    }
}

const routes = [new Route('/', LogIn, {rootQuery: '.app'}),
    new Route('/sign_in', SignIn, {rootQuery: '.app'}),
new Route('/change_password', ChangePassword, {rootQuery: '.app'}),
new Route('/change_profile_info', ChangeProfileInfo, {rootQuery: '.app'}),
new Route('/chats', Chats, {rootQuery: '.app'}),
new Route('/chat_window', ChatWindow, {rootQuery: '.app'}),
new Route('/profile', Profile, {rootQuery: '.app'}),
new Route('/404', Error404, {rootQuery: '.app'}),
new Route('/500', Error500, {rootQuery: '.app'})];

export class Router {
    private routes: Route[] | undefined;
    private history: History | undefined;
    // @ts-ignore
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;
    private static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = routes;
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
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

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        this._currentRoute = route;
        route!.render();
    }

    go(pathname: string) {
        this.history!.pushState({}, "", pathname);
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

let _router: Router;
export default function router() {
    if (!_router) {
        _router = new Router('.app');
        _router
            .use('/', new LogIn())
            .use('/sign_in', new SignIn())
            .use('/change_password', new ChangePassword())
            .use('/change_profile_info', new ChangeProfileInfo())
            .use('/chats', new Chats())
            .use('/chat_widow', new ChatWindow())
            .use('/profile', new Profile())
            .use('/404', new Error404())
            .use('/500', new Error500())
            .start();
    }
    return _router;
}