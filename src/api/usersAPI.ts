import HTTP, {Options} from '../modules/http';
import { BaseAPI } from './baseAPI';

const usersAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

export class UsersAPI extends BaseAPI{
    changeInfo(options: Options){
        return usersAPIInstance.put('/profile', options);
    }

    changePassword(options: Options){
        return usersAPIInstance.put('/password', options);
    }

    changeAvatar(options: Options){
        return usersAPIInstance.put('/profile/avatar', options);
    }
}