import HTTP, {Options} from '../modules/http/http';
import {BaseAPI} from './baseAPI';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
    userInfo() {
        return authAPIInstance.get('/user');
    }

    signUp(options: Options) {
        return authAPIInstance.post('/signup', options);
    }

    signIn(options: Options) {
        return authAPIInstance.post('/signin', options);
    }

    logOut() {
        return authAPIInstance.post('/logout', {});
    }
}

export const auth = new AuthAPI();
