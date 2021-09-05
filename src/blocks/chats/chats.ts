import Block from '../../modules/block/block';
import {template} from './chats.tmpl';
import {chats} from '../../api/chatsAPI';
import {CreateChatModal} from '../createChatModal/createChatModal';
import {ChatWindow} from '../chatWindow/chatWindow';
import {ActionTypes, store} from '../../modules/store';

export class Chats extends Block {
    constructor() {
        super('main', {
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    async componentDidMount() {
        store.subscribe(ActionTypes.GET_CHATS, this.setChats.bind(this));
        try {
            const chatList = await chats.getChats();
            store.dispatchAction(ActionTypes.GET_CHATS, chatList);
        } catch (e) {
            console.log(e);
        }
    }

    setChats() {
        this.setProps({...this.props, chats: store.get('chats')});
    }

    openChatWindow(chat: HTMLElement) {
        store.dispatchAction(ActionTypes.GET_CHAT_ID, chat.dataset.chatId);
        const chatWindow = new ChatWindow({});
        const chatsPage = document.querySelector('.chats-page')!;
        const chooseChatWindow = document.querySelector('.chat-window')!;
        chatsPage.removeChild(chooseChatWindow);
        chatsPage.appendChild(chatWindow.getContent()!);
    }

    handleClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target === document.querySelector('.create-new-chat')) {
            const createChatModal = new CreateChatModal();
            document.querySelector('.app main')!.appendChild(createChatModal.getContent()!);
        } else if (target.className === 'chat-item') {
            this.openChatWindow(target);
        }
    }

    render() {
        const {chats} = this.props;
        return template({
            chats
        })
    }
}


