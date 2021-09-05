import HTTP, {Options} from '../modules/http/http';
import {BaseAPI} from './baseAPI';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
    private userInfo: XMLHttpRequest | string | null = null;

    async getUserInfo() {
        this.userInfo = this.userInfo ??  await authAPIInstance.get('/user');
        setTimeout(() => {
            this.userInfo = null;
        }, 1000);
        return JSON.parse(<string>this.userInfo);
    }

    signUp(options: Options) {
        return authAPIInstance.post('/signup', options);
    }

    signIn(options: Options) {
        return authAPIInstance.post('/signin', options);
    }

    logOut() {
        return authAPIInstance.post('/logout');
    }
}

export const auth = new AuthAPI();
