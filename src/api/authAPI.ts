import HTTP, {Options} from '../modules/http';
import { BaseAPI } from './baseAPI';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

export class AuthAPI extends BaseAPI{
    request(){
        return authAPIInstance.get('/user');
    }

    signUp(options: Options){
        return authAPIInstance.post('/signup', options);
    }

    signIn(options: Options){
        return authAPIInstance.post('/signin', options);
    }

    logOut(options: Options){
        return authAPIInstance.post('/logout', options);
    }
}