import 'regenerator-runtime/runtime';
import Block from '../../modules/block/block';
import {template} from './chatWindow.tmpl';
import {ChatControls} from '../chatControls/chatControls';
import WebSocketService from '../../modules/webSocket';
import {chats} from '../../api/chatsAPI';
import {auth} from '../../api/authAPI';

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
        await this.getChatToken();
        await this.getUserInfo();
        this.connectToChat();
    }

    async getChatToken() {
        return chats.getChatToken(this.props.chatId.toString())
            // @ts-ignore
            .then(result => this.setProps({...this.props, chatToken: JSON.parse(result.response).token}))
            .catch(e => console.log(e));
    }

    async getUserInfo() {
        return auth.userInfo()
            // @ts-ignore
            .then(result => this.setProps({...this.props, userId: JSON.parse(result.response).id}))
            .catch(e => console.log(e));
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
        const {userId, chatId, token} = this.props;
        new WebSocketService(userId, chatId, token);
    }

    sendChatMessage(message: string) {
        new WebSocketService().send({
            content: message,
            type: 'message',
        });
    }

    renderChatHistory() {
        return `this is going to be chat history`;
    }

    render() {
        return template({
            chatHistory: this.renderChatHistory()
        })
    }
}
