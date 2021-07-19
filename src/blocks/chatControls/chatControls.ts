import Block from '../../modules/block/block';
import {template} from './chatControls.tmpl';
import {CreateChatModal} from '../createChatModal/createChatModal';
import {ChatControlsModal} from '../chatControlsModal/chatControlsModal';
import {Button} from '../../components/button/button';

export class ChatControls extends Block {
    constructor(props: any) {
        super('div', {
            ...props,
            className: 'chat-controls',
            events: {
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    showControlsModal(type: string) {
        const chatControlsModal = new ChatControlsModal({
            chatId: this.props.chatId,
            modalType: type,
            modalHeader: type === 'add' ? 'Добавить пользователя' : 'Удалить пользователя',
            submitButton: new Button({
                class: 'create-chat-send basic-button',
                type: 'submit',
                text: type === 'add' ? 'Добавить' : 'Удалить'
            })
        });
        document.querySelector('.app main')!.appendChild(chatControlsModal.getContent()!);
    }

    handleClick(e: Event) {
        if (e.target === document.querySelector('.add-user')) {
            this.showControlsModal('add');
        } else if (e.target === document.querySelector('.remove-user')) {
            this.showControlsModal('remove');
        } else if (e.target === document.querySelector('.add-new-chat-button')) {
            const createChatModal = new CreateChatModal();
            document.querySelector('.app main')!.appendChild(createChatModal.getContent()!);
        }
    }

    render() {
        return template({})
    }
}
