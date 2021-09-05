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

    async searchByLogin(options: Options) {
        const userByLogin = await usersAPIInstance.post('/search', options);
        return JSON.parse(<string>userByLogin);
    }
}

export const users = new UsersAPI();
