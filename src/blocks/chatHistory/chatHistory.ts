import Block from '../../modules/block/block';

type MessageT = {
    time: string;
    incoming: boolean;
    content: string;
    file: string | null;
}

export class ChatHistory extends Block {
    constructor(props: any) {
        super('div', {
            ...props
        });
    }

    render() {
        const {chatMessages} = this.props;
        if (chatMessages) {
            return chatMessages.length ? chatMessages.map((message: MessageT) => `
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
        `).join('') : '';
        } else {
            return '';
        }
    }
}
