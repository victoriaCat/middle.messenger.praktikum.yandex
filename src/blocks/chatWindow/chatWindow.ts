import {Chats} from '../chats/chats';
import {template} from './chatWindow.tmpl';

type message = {
    time: string,
    incoming: boolean,
    text: string,
    attachments: string | null
}

export class ChatWindow extends Chats {
    constructor() {
        super();
    }

    renderChatHistory() {
        return this.props.chats[3].chatHistory['19.06'].map((message: message) => `
        ${message.incoming ?
            `<div class="message left-side-message">
                ${message.text || `<img class="message-attachment" src=${message.attachments} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
            </div>` :
            `<div class="message right-side-message">
                ${message.text || `<img class="message-attachment" src=${message.attachments} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
                <img class="message-sent" src="../../assets/icons/sent.svg" alt="Отправлено">
            </div>`}
        `).join('');
    };

    render() {
        const {chats} = this.props;
        return template({
            chats,
            chatHistory: this.renderChatHistory()
        })
    }
}