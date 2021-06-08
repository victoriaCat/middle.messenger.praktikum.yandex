import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {template} from './changeAvatar.tmpl';
import {users} from '../../api/usersAPI';

export class ChangeAvatar extends Block {
    constructor() {
        super('div', {
            header: 'Загрузите файл',
            picName: '',
            submitButton: new Button({
                class: 'change-avatar-save basic-button',
                type: 'submit',
                text: 'Поменять'
            }),
            submitError: '',
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                click: (e: Event) => this.handleClick(e)
            }
        })
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const formElem: HTMLFormElement = document.querySelector('.change-avatar-form')!;
        const inputElem: HTMLInputElement = document.querySelector('#avatar')!;
        if (e.target === formElem) {
            const formData: FormData = new FormData();
            // @ts-ignore
            formData.append('avatar', inputElem.files[0]);
            users.changeAvatar({
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: formData
            }).catch(console.log);
        }
    }

    handleClick(e: Event) {
        const changeAvatarModal: HTMLElement = document.querySelector('.modal')!;
        if (e.target === changeAvatarModal) {
            changeAvatarModal.classList.add('hide');
        }
    }

    render() {
        const {submitButton, header, picName, submitError} = this.props;
        return template({
            submitButton: submitButton.render(),
            header,
            picName,
            submitError
        })
    }
}
