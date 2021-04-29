import HTTP, {Options} from '../modules/http';
import { BaseAPI } from './baseAPI';

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export class ChatsAPI extends BaseAPI {
    createChat(options: Options) {
        return chatAPIInstance.post('/', options);
    }

    getChats() {
        return chatAPIInstance.get('/');
    }

    addUsers(options: Options){
        return chatAPIInstance.put('/users', options);
    }

    deleteUsers(options: Options){
        return chatAPIInstance.delete('/users', options);
    }
}