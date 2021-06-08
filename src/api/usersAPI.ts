import HTTP, {Options} from '../modules/http/http';
import {BaseAPI} from './baseAPI';

const usersAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

class UsersAPI extends BaseAPI {
    changeInfo(options: Options) {
        return usersAPIInstance.put('/profile', options);
    }

    changePassword(options: Options) {
        return usersAPIInstance.put('/password', options);
    }

    changeAvatar(options: Options) {
        return usersAPIInstance.put('/profile/avatar', options);
    }

    searchByLogin(options: Options) {
        return usersAPIInstance.post('/search', options);
    }
}

export const users = new UsersAPI();
