import Block from '../../modules/block/block';
import {template} from './profile.tmpl';
import {auth} from '../../api/authAPI';
import router from '../../../static';
import {ActionTypes, store} from '../../modules/store';

export class Profile extends Block {
    constructor() {
        super('main', {
            userData: {},
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        })
    }

    async componentDidMount() {
        try {
            const userInfo = await auth.getUserInfo();
            store.dispatchAction(ActionTypes.GET_CURRENT_USER, userInfo);
            this.setProps({...this.props, userData: userInfo});
        } catch (e) {
            console.log(e);
        }
    }

    handleClick(e: Event) {
        const quitLink: HTMLAnchorElement = document.querySelector('.quit-link')!;
        if (e.target === quitLink) {
            e.preventDefault();
            auth.logOut().then(() => {
                store.dispatchAction(ActionTypes.LOGOUT);
                router().go('/');
            }).catch(console.log);
        }
    }

    render() {
        const {userData} = this.props;
        return template({
            firstName: userData.first_name || '',
            secondName: userData.second_name || '',
            nickname: userData.display_name || '',
            login: userData.login || '',
            email: userData.email || '',
            phone: userData.phone || '',
            avatar: userData.avatar ? `https://ya-praktikum.tech/api/v2/resources/${userData.avatar}` : 'assets/icons/profile-picture.svg'
        })
    }
}
