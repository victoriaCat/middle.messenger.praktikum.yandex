import 'regenerator-runtime/runtime';
import Block from '../../modules/block/block';
import {template} from './chatWindow.tmpl';
import {ChatControls} from '../chatControls/chatControls';
import {ChatHistory} from '../chatHistory/chatHistory';
import {ActionTypes, store} from '../../modules/store';
import WebSocketService from '../../modules/webSocket';
import {chats} from '../../api/chatsAPI';

export class ChatWindow extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chat-window',
            events: {
                click: (e: Event) => this.handleClick(e),
                keyup: (e: Event) => this.handleKeyUp(e)
            }
        });
    }

    async componentDidMount() {
        store.subscribe(ActionTypes.GET_CHAT_MESSAGES, this.setChatMessages.bind(this));
        try {
            const chatToken = await chats.getChatToken(<string>store.get('chatId'));
            store.dispatchAction(ActionTypes.GET_CHAT_TOKEN, chatToken.token);

            if (store.get('chatId') && store.get('chatToken') && store.get('userInfo')) {
                this.connectToChat();
            }
        } catch (e) {
            console.log(e);
        }
    }

    setChatMessages() {
        this.setProps({...this.props, chatMessages: store.get('chatMessages')});
    }

    showChatControls() {
        const chatControls = new ChatControls({chatId: store.get('chatId')});
        document.querySelector('.chat-window')!.appendChild(chatControls.getContent()!);
    }

    hideChatControls(controls: HTMLElement) {
        document.querySelector('.chat-window')!.removeChild(controls);
    }

    handleClick(e: Event) {
        if (e.target === document.querySelector('.chat-options')) {
            const controls: HTMLElement | null = document.querySelector('.chat-controls');
            if (controls) {
                this.hideChatControls(controls);
            } else {
                this.showChatControls();
            }
        }
        if (e.target === document.querySelector('.send-button')) {
            const messageInput: HTMLInputElement = document.querySelector('.message-input')!;
            this.sendChatMessage(messageInput.value);
        }
    }

    handleKeyUp(e: Event) {
        // @ts-ignore
        if (e.key === 'Enter') {
            const messageInput: HTMLInputElement = document.querySelector('.message-input')!;
            this.sendChatMessage(messageInput.value);
        }
    }

    connectToChat() {
        const userId = (<Record<string, string>>store.get('userInfo')).id;
        const chatId = Number(store.get('chatId'));
        const token = <string>store.get('chatToken');
        new WebSocketService(userId, chatId, token);
    }

    sendChatMessage(message: string) {
        if (message === '') {
            return;
        }
        (new WebSocketService()).send({
            content: message,
            type: 'message',
        });
    }

    renderChatHistory() {
        return new ChatHistory({...this.props}).render();
    }

    getChatTitle() {
        const chats = store.get('chats');
        if (Array.isArray(chats)) {
            return chats.find(chat => chat.id === Number(store.get('chatId')))!.title;
        }
    }

    getChatAvatar() {
        const chats = store.get('chats');
        if (Array.isArray(chats)) {
            return chats.find(chat => chat.id === Number(store.get('chatId')))!.avatar;
        }
    }

    render() {
        return template({
            chatTitle: this.getChatTitle(),
            chatAvatar: this.getChatAvatar() ? `https://ya-praktikum.tech/api/v2/resources/${this.getChatAvatar()}` : '',
            chatHistory: this.renderChatHistory()
        })
    }
}
