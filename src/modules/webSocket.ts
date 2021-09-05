import {ActionTypes, store} from './store';

type messagePayloadT = {
    content: string;
    type: string
}

export default class WebSocketService {
    static __instance: WebSocketService;
    private socket;
    private userId: number;

    constructor(userId?: string, chatId?: number, chatToken?: string) {
        if (userId && chatId && chatToken) {
            this.socket?.close();
            this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`);
            this.socket.addEventListener('open', this.onOpen.bind(this));
            this.socket.addEventListener('message', this.onMessage.bind(this));
            this.socket.addEventListener('error', this.onError.bind(this));
            this.socket.addEventListener('close', this.onClose.bind(this));
        }
        this.userId = Number(userId);
        if (WebSocketService.__instance) {
            return WebSocketService.__instance;
        }
        WebSocketService.__instance = this;
    }

    send(payload: messagePayloadT) {
        this.socket?.send(JSON.stringify(payload));
    }

    onOpen() {
        console.log('Connection established');
        this.send({
            content: '0',
            type: 'get old'
        });
    }

    onMessage(event: any) {
        console.log('Data received: ', event);

        let data = JSON.parse(event.data);
        if (data.type === 'user connected') {
            return;
        }
        const configureData = (data: Record<string, unknown>) => ({
            ...data, incoming: data.user_id !== this.userId
        });
        if (Array.isArray(data)) {
            data = data.map((item: Record<string, unknown>) => configureData(item));
            data.reverse();
        } else {
            data = configureData(data);
        }
        store.dispatchAction(ActionTypes.GET_CHAT_MESSAGES, data);
    }

    onError(event: any) {
        console.log('Error: ', event.message);
    }

    onClose(event: any) {
        if (event.wasClean) {
            console.log('Connection closed');
        } else {
            console.log('Connection interrupted');
        }
        console.log(`Event code: ${event.code}`);
        console.log(`Event reason: ${event.reason}`);
    }
}

