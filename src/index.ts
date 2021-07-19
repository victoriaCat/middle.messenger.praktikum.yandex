import {Router} from './modules/router/router';
import {LogIn} from './blocks/logIn/logIn';
import {SignIn} from './blocks/signIn/signIn';
import {ChangePassword} from './blocks/changePassword/changePassword';
import {ChangeProfileInfo} from './blocks/changeProfileInfo/changeProfileInfo';
import {Chats} from './blocks/chats/chats';
import {Profile} from './blocks/profile/profile';
import {Error404} from './blocks/errorPage/error404';
import {Error500} from './blocks/errorPage/error500';

let _router: Router;
export default function router() {
    if (!_router) {
        _router = new Router('.app');
        _router
            .use('/', LogIn)
            .use('/sign_in', SignIn)
            .use('/change_password', ChangePassword)
            .use('/change_profile_info', ChangeProfileInfo)
            .use('/chats', Chats)
            .use('/profile', Profile)
            .use('/404', Error404)
            .use('/500', Error500)
            .start();
    }
    return _router;
}

router();
