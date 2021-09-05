import {Router} from '../src/modules/router/router';
import {LogIn} from '../src/blocks/logIn/logIn';
import {SignIn} from '../src/blocks/signIn/signIn';
import {ChangePassword} from '../src/blocks/changePassword/changePassword';
import {ChangeProfileInfo} from '../src/blocks/changeProfileInfo/changeProfileInfo';
import {Chats} from '../src/blocks/chats/chats';
import {Profile} from '../src/blocks/profile/profile';
import {Error404} from '../src/blocks/errorPage/error404';
import {Error500} from '../src/blocks/errorPage/error500';
import '../src/index.less';

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
