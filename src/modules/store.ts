enum ActionTypes {
    GET_CURRENT_USER = 'get_current_user',
    LOGOUT = 'logout',
    GET_CHATS = 'chats',
    GET_CHAT_TOKEN = 'get_chat_token',
    GET_CHAT_MESSAGES = 'get_chat_messages'
}

class GlobalStore {
    static state: Record<string, unknown> = {
        chatMessages: {}
    }
    static subscribers: Record<string, unknown> = {}

    static subscribe(action: string, callback: (state?: Record<string, unknown>) => void) {
        if (!Object.prototype.hasOwnProperty.call(this.subscribers, action)) {
            this.subscribers[action] = [];
        }

        (<(() => void)[]> this.subscribers[action]).push(callback);

        return () => this.subscribers[action] = (<(() => void)[]> this.subscribers[action]).filter(
            sub => sub !== callback
        );
    }

    static unsubscribeAll() {
        this.subscribers = {};
    }

    static dispatchAction(action: string, payload?: Record<string, unknown> | Record<string, unknown>[] | string | number | unknown) {
        this.state = (<(state: Record<string, unknown>, payload?: Record<string, unknown> | Record<string, unknown>[] | string | number | unknown)=>Record<string, unknown>>ACTIONS[action])(this.state, payload);
        this.publish(action);
    }

    static publish(action: string) {
        if (Object.prototype.hasOwnProperty.call(this.subscribers, action)) {
            (<((cb: Record<string, unknown>) => void)[]> this.subscribers[action]).forEach(cb => cb(this.state));
        }
    }

    static get(name: string) {
        return <Record<string, unknown> | Record<string, unknown>[] | string | number> this.state[name];
    }

}

const ACTIONS: Record<string, unknown> = {
    [ActionTypes.GET_CURRENT_USER]: (state: Record<string, unknown>, payload: Record<string, unknown> | Record<string, unknown>[]) => ({
        ...state,
        userInfo: payload
    }),

    [ActionTypes.LOGOUT]: () => ({}),

    [ActionTypes.GET_CHATS]: (state: Record<string, unknown>, payload: Record<string, unknown> | Record<string, unknown>[]) => ({
        ...state,
        chats: payload
    }),

    [ActionTypes.GET_CHAT_TOKEN]: (state: Record<string, unknown>, payload: Record<string, unknown> | Record<string, unknown>[]) => ({
        ...state,
        chatToken: payload
    }),

    [ActionTypes.GET_CHAT_MESSAGES]: (state: Record<string, unknown>, payload: Record<string, unknown> | Record<string, unknown>[]) => ({
        ...state,
        chatMessages: payload
    })
};

export {
    GlobalStore,
    ActionTypes
};
