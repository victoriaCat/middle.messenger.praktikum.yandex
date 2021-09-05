import HTTP, {Options} from '../modules/http/http';
import {BaseAPI} from './baseAPI';

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

class ChatsAPI extends BaseAPI {
    createChat(options: Options) {
        return chatAPIInstance.post('/', options);
    }

    async getChats() {
        const chats = await chatAPIInstance.get('/');
        return JSON.parse(<string>chats);
    }

    addUsers(options: Options) {
        return chatAPIInstance.put('/users', options);
    }

    deleteUsers(options: Options) {
        return chatAPIInstance.delete('/users', options);
    }

    async getChatToken(id: string) {
        const token = await chatAPIInstance.post(`/token/${id}`)
        return JSON.parse(<string>token);
    }
}

export const chats = new ChatsAPI();
