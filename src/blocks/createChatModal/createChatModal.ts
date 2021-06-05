import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {template} from './createChatModal.tmpl';
import {chats} from '../../api/chatsAPI';
import router from '../../index';

export class CreateChatModal extends Block {
    constructor() {
        super('div', {
            className: 'modal',
            submitButton: new Button({
                class: 'create-chat-send basic-button',
                type: 'submit',
                text: 'Создать'
            }),
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    handleClick(e: Event) {
        if(e.target === document.querySelector('.modal')){
            const mainNode = document.querySelector('main')!;
            const modal = mainNode.lastChild!;
            mainNode.removeChild(modal);
        }
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const chatTitleInput: HTMLInputElement = document.querySelector('.chat-title')!;
        const chatData = {
            title: chatTitleInput.value
        };
        chats.createChat({
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(chatData)
        }).then(() => router().go('/chats')).catch(e => console.log(e));
    }

    render() {
        const {submitButton} = this.props;
        return template({
            submitButton: submitButton.render()
        })
    }
}
