export enum ActionTypes {
    GET_CURRENT_USER = 'get_current_user',
    LOGOUT = 'logout',
    GET_CHATS = 'chats',
    GET_CHAT_TOKEN = 'get_chat_token',
    GET_CHAT_MESSAGES = 'get_chat_messages',
    GET_CHAT_ID = 'get_chat_id'
}

type StateT = Record<string, unknown>;
type PayloadT = Record<string, unknown> | Record<string, unknown>[];

class GlobalStore {
    state: Record<string, unknown> = {
        chatMessages: []
    }
    subscribers: Record<string, unknown> = {}

    subscribe(action: string, callback: (state?: StateT) => void) {
        if (!Object.prototype.hasOwnProperty(action)) {
            this.subscribers[action] = [];
        }

        (<(() => void)[]>this.subscribers[action]).push(callback);

        return () => this.subscribers[action] = (<(() => void)[]>this.subscribers[action]).filter(
            sub => sub !== callback
        );
    }

    unsubscribeAll() {
        this.subscribers = {};
    }

    dispatchAction(action: string, payload?: PayloadT | string | number | unknown) {
        this.state = (<(state: Record<string, unknown>, payload?: PayloadT| string | number | unknown) => Record<string, unknown>>ACTIONS[action])(this.state, payload);
        this.publish(action);
    }

    publish(action: string) {
        if (Object.prototype.hasOwnProperty.call(this.subscribers, action)) {
            (<((cb: Record<string, unknown>) => void)[]>this.subscribers[action]).forEach(cb => cb(this.state));
        }
    }

    get(name: string) {
        return <PayloadT | string | number>this.state[name];
    }

}

const ACTIONS: Record<string, unknown> = {
    [ActionTypes.GET_CURRENT_USER]: (state: StateT, payload: PayloadT) => ({
        ...state,
        userInfo: payload
    }),

    [ActionTypes.LOGOUT]: () => ({}),

    [ActionTypes.GET_CHATS]: (state: StateT, payload: PayloadT) => ({
        ...state,
        chats: payload
    }),

    [ActionTypes.GET_CHAT_TOKEN]: (state: StateT, payload: PayloadT) => ({
        ...state,
        chatToken: payload
    }),

    [ActionTypes.GET_CHAT_MESSAGES]: (state: StateT, payload: PayloadT) => ({
        ...state,
        chatMessages: payload
    }),

    [ActionTypes.GET_CHAT_ID]: (state: StateT, payload: PayloadT) => ({
        ...state,
        chatId: payload,
        chatToken: null
    }),
};

export const store = new GlobalStore();
