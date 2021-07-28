import 'regenerator-runtime/runtime';
import Block from '../../modules/block/block';
import {template} from './chatWindow.tmpl';
import {ChatControls} from '../chatControls/chatControls';
import {ActionTypes, GlobalStore} from '../../modules/store';
import WebSocketService from '../../modules/webSocket';
import {chats} from '../../api/chatsAPI';
import {auth} from '../../api/authAPI';

type MessageT = {
    time: string,
    incoming: boolean,
    content: string,
    file: string | null
}

export class ChatWindow extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chat-window',
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    async componentDidMount() {
        GlobalStore.subscribe(ActionTypes.GET_CHAT_MESSAGES, this.getChatMessages.bind(this));
        try {
            const userInfo = <XMLHttpRequest>await auth.userInfo();
            GlobalStore.dispatchAction(ActionTypes.GET_CURRENT_USER, JSON.parse(userInfo.response));

            const chatToken = <XMLHttpRequest>await chats.getChatToken(this.props.chatId);
            GlobalStore.dispatchAction(ActionTypes.GET_CHAT_TOKEN, JSON.parse(chatToken.response).token);

            if (this.props.chatId && GlobalStore.get('chatToken') && GlobalStore.get('userInfo')) {
                this.connectToChat();
            }
        } catch (e) {
            console.log(e);
        }
    }

    getChatMessages() {
        this.setProps({...this.props, chatMessages: GlobalStore.get('chatMessages')});
    }

    showChatControls() {
        const chatControls = new ChatControls({chatId: this.props.chatId});
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

    connectToChat() {
        const userId = (<Record<string, string>>GlobalStore.get('userInfo')).id;
        const chatId = Number(this.props.chatId);
        const token = <string>GlobalStore.get('chatToken');
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
        const {chatMessages} = this.props;
        return chatMessages ? chatMessages.map((message: MessageT) => `
        ${message.incoming ?
            `<div class="message left-side-message">
                ${message.content || `<img class="message-attachment" src=${message.file} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
            </div>` :
            `<div class="message right-side-message">
                ${message.content || `<img class="message-attachment" src=${message.file} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
                <img class="message-sent" src="../../assets/icons/sent.svg" alt="Отправлено">
            </div>`}
        `).join('') : 'this is going to be chat history';
    }

    getChatTitle() {
        const chats = GlobalStore.get('chats');
        if(Array.isArray(chats)){
            return chats.find(chat => chat.id === Number(this.props.chatId))!.title;
        }
    }

    getChatAvatar() {
        const chats = GlobalStore.get('chats');
        if(Array.isArray(chats)){
            return chats.find(chat => chat.id === Number(this.props.chatId))!.avatar;
        }
    }

    render() {
        return template({
            chatTitle: this.getChatTitle(),
            chatAvatar: `https://ya-praktikum.tech/api/v2/resources${this.getChatAvatar()}` || null,
            chatHistory: this.renderChatHistory()
        })
    }
}
