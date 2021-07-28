import Block from '../../modules/block/block';
import {template} from './chats.tmpl';
import {chats} from '../../api/chatsAPI';
import {CreateChatModal} from '../createChatModal/createChatModal';
import {ChatWindow} from '../chatWindow/chatWindow';
import {ActionTypes, GlobalStore} from '../../modules/store';


export class Chats extends Block {
    constructor() {
        super('main', {
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    async componentDidMount() {
        GlobalStore.subscribe(ActionTypes.GET_CHATS, this.getChatsCallback.bind(this));
        try {
            const chatList = <XMLHttpRequest>await chats.getChats();
            GlobalStore.dispatchAction(ActionTypes.GET_CHATS, JSON.parse(chatList.response));
        } catch (e) {
            console.log(e);
        }
    }

    getChatsCallback() {
        this.setProps({...this.props, chats: GlobalStore.get('chats')})
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


