import Block from '../../modules/block/block';
import {template} from './chatControlsModal.tmpl';
import {chats} from '../../api/chatsAPI';
import {users} from '../../api/usersAPI';
import router from '../../../static';

type chatDataT = {
    users: any[];
    chatId: number | null
}

export class ChatControlsModal extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'modal',
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    closeModal() {
        const mainNode = document.querySelector('main')!;
        const modal = mainNode.lastChild!;
        mainNode.removeChild(modal);
    }

    searchUser(data: chatDataT) {
        const userLoginInput: HTMLInputElement = document.querySelector('.add-remove-user-login')!;
        const userLogin = userLoginInput.value;
        const searchByLoginData = {
            login: userLogin
        };
        return users.searchByLogin({
            data: searchByLoginData
        }).then(result => {
            // @ts-ignore
            const response = JSON.parse(result.response);
            data.users.push(response[0].id);
        }).catch(console.log);
    }

    addUser(data: chatDataT) {
        chats.addUsers({
            data
        }).then(() => router().go('/chats')).catch(console.log);
    }

    removeUser(data: chatDataT) {
        chats.deleteUsers({
            data
        }).then(() => router().go('/chats')).catch(console.log);
    }

    handleClick(e: Event) {
        if (e.target === document.querySelector('.modal')) {
            this.closeModal();
        }
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const chatData: chatDataT = {
            users: [],
            chatId: Number(this.props.chatId)
        };
        if (this.props.modalType === 'add') {
            this.searchUser(chatData).then(() => this.addUser(chatData));
        } else if (this.props.modalType === 'remove') {
            this.searchUser(chatData).then(() => this.removeUser(chatData));
        }
    }

    render() {
        const {submitButton, modalHeader} = this.props;
        return template({
            submitButton: submitButton.render(),
            modalHeader
        })
    }
}
