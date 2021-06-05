import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {submitValidation, blurValidation, validatedInput} from '../../modules/styleValidation';
import {template} from './changePassword.tmpl';
import escape from '../../modules/escape';
import {users} from '../../api/usersAPI';

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
                focusout: (e: Event) => this.handleInputsBlur(e)
            }
        });
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
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                oldPassword: inputs[0].elem.value,
                newPassword: inputs[1].elem.value
            })
        }).catch(e => console.log(e));
        submitValidation(inputs);
    }

    handleInputsBlur(e: Event) {
        e.stopPropagation();
        const {inputs} = this.props;
        this.defineInputs(inputs);
        inputs.forEach((input: validatedInput) => {
            if (e.target === input.elem) {
                blurValidation(input);
            }
        })
    }

    render() {
        const {inputs, submitButton} = this.props;
        return template({
            inputs,
            submitButton: submitButton.render()
        });
    }
}
