import Block from '../../modules/block/block';
import {template} from './chats.tmpl';
import {chats} from '../../api/chatsAPI';
import {CreateChatModal} from '../createChatModal/createChatModal';
import {ChatWindow} from '../chatWindow/chatWindow';

export class Chats extends Block {
    constructor() {
        super('main', {
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    componentDidMount() {
        // @ts-ignore
        chats.getChats().then(result => this.setProps({...this.props, chats: JSON.parse(result.response)}))
            .catch(console.log);
    }

    openChatWindow() {
        const chatItem: HTMLElement = document.querySelector('.chat-item')!;
        const chatWindow = new ChatWindow({chatId: chatItem.dataset.chatId});
        const chatsPage = document.querySelector('.chats-page')!;
        const chooseChatWindow = document.querySelector('.chat-window')!;
        chatsPage.removeChild(chooseChatWindow);
        chatsPage.appendChild(chatWindow.getContent()!);
    }

    handleClick(e: Event) {
        if (e.target === document.querySelector('.create-new-chat')) {
            const createChatModal = new CreateChatModal();
            document.querySelector('.app main')!.appendChild(createChatModal.getContent()!);
        } else if (e.target === document.querySelector('.chat-item')) {
            this.openChatWindow();
        }
    }

    render() {
        const {chats} = this.props;
        return template({
            chats
        })
    }
}


