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

    searchUser(login: string) {
        const searchByLoginData = {
            login
        };
        return users.searchByLogin({
            data: searchByLoginData
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

    async handleSubmit(e: Event) {
        e.preventDefault();
        const userLoginInput: HTMLInputElement = document.querySelector('.add-remove-user-login')!;
        const chatData: chatDataT = {
            users: [],
            chatId: Number(this.props.chatId)
        };
        const userByLogin = await this.searchUser(userLoginInput.value);
        chatData.users.push(userByLogin[0].id);
        if (this.props.modalType === 'add') {
            await this.addUser(chatData);
        } else if (this.props.modalType === 'remove') {
            await this.removeUser(chatData);
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
