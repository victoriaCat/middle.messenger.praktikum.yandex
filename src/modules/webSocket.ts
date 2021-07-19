type messagePayloadT = {
    content: string,
    type: string
}

export default class WebSocketService {
    static __instance: WebSocketService;
    private socket;

    constructor(userId?: string, chatId?: number, chatToken?: string) {
        if (userId && chatId && chatToken) {
            this.socket?.close();
            this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`);
            this.socket.addEventListener('open', this.onOpen.bind(this));
            this.socket.addEventListener('message', this.onMessage.bind(this));
            this.socket.addEventListener('error', this.onError.bind(this));
            this.socket.addEventListener('close', this.onClose.bind(this));
        }
        if (WebSocketService.__instance) {
            return WebSocketService.__instance;
        }
        WebSocketService.__instance = this;
    }

    send(payload: messagePayloadT) {
        console.log('Message sent');
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
        return JSON.parse(event.data);
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

