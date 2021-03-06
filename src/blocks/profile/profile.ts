import Block from '../../modules/block/block';
import {template} from './profile.tmpl';
import {auth} from '../../api/authAPI';
import router from '../../index';

export class Profile extends Block {
    constructor() {
        super('main', {
            userData: {},
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        })
    }

    componentDidMount() {
        // @ts-ignore
        auth.userInfo().then(result => this.setProps({...this.props, userData: JSON.parse(result.response)}))
            .catch(console.log);
    }

    handleClick(e: Event) {
        const quitLink: HTMLAnchorElement = document.querySelector('.quit-link')!;
        if (e.target === quitLink) {
            e.preventDefault();
            auth.logOut().then(() => router().go('/'))
                .catch(console.log);
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
            avatar: userData.avatar || 'assets/icons/profile-picture.svg'
        })
    }
}
