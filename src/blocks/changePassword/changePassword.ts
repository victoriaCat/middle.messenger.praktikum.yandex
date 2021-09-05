import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {submitValidation, blurValidation, validatedInput} from '../../modules/styleValidation';
import {template} from './changePassword.tmpl';
import escape from '../../modules/escape';
import {users} from '../../api/usersAPI';
import {auth} from '../../api/authAPI';

export class ChangePassword extends Block {
    constructor() {
        super('main', {
            inputs: [
                {
                    name: 'Старый пароль',
                    type: 'password',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data password-old',
                    errClass: 'password-old-err',
                    validationType: 'password',
                    errSelector: '.password-old-err'
                },
                {
                    name: 'Новый пароль',
                    type: 'password',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data password-new',
                    errClass: 'password-new-err',
                    validationType: 'password',
                    errSelector: '.password-new-err'
                },
                {
                    name: 'Повторите новый пароль',
                    type: 'password',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data confirm-password',
                    errClass: 'confirm-password-err',
                    validationType: 'password',
                    errSelector: '.confirm-password-err'
                }
            ],
            submitButton: new Button({
                class: 'change-profile-save basic-button',
                type: 'submit',
                text: 'Сохранить'
            }),
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                focusout: (e: Event) => this.handleInputBlur(e),
                focusin: (e: Event) => this.handleInputFocus(e)
            }
        });
    }

    componentDidMount() {
        auth.getUserInfo().then(result => this.setProps({avatar: result.avatar}))
            .catch(console.log);
    }

    defineInputs = (inputs: validatedInput[]) => {
        const oldPasswordElem: HTMLInputElement | null = document.querySelector('.password-old');
        const newPasswordElem: HTMLInputElement | null = document.querySelector('.password-new');
        const confirmPasswordElem: HTMLInputElement | null = document.querySelector('.confirm-password');

        inputs[0]['elem'] = oldPasswordElem;
        inputs[1]['elem'] = newPasswordElem;
        inputs[2]['elem'] = confirmPasswordElem;
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const {inputs} = this.props;
        this.defineInputs(inputs);
        inputs.forEach((input: validatedInput) => input.elem!.value = escape(input.elem!.value));
        users.changePassword({
            data: {
                oldPassword: inputs[0].elem.value,
                newPassword: inputs[1].elem.value
            }
        }).catch(console.log);
        submitValidation(inputs);
    }

    handleInputBlur(e: Event) {
        e.stopPropagation();
        const {inputs} = this.props;
        this.defineInputs(inputs);
        inputs.forEach((input: validatedInput) => {
            if (e.target === input.elem) {
                blurValidation(input);
            }
        })
    }

    handleInputFocus(e: Event) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        target.classList.remove('validation-error');
        const errElem = document.querySelector(`.${target.classList[1]}-err`);
        errElem!.classList.remove('show');
    }

    render() {
        const {inputs, submitButton} = this.props;
        return template({
            inputs,
            avatar: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
                : 'assets/icons/profile-picture.svg',
            submitButton: submitButton.render()
        });
    }
}
