import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {Input} from '../../components/input/input';
import {submitValidation, blurValidation} from '../../modules/styleValidation';
import {template} from './logIn.tmpl';
import escape from '../../modules/escape';
import router from '../../modules/router/router';

export class LogIn extends Block {
    constructor() {
        super('main', {
            submitButton: new Button({
                class: 'log-in-button basic-button',
                type: 'submit',
                text: 'Авторизоваться'
            }),
            loginInput: new Input({
                labelClass: 'basic-label',
                name: 'Логин',
                inputClass: 'login basic-input',
                type: 'text',
                errClass: 'login-err'
            }),
            passwordInput: new Input({
                labelClass: 'basic-label',
                name: 'Пароль',
                inputClass: 'password basic-input',
                type: 'password',
                errClass: 'password-err'
            }),
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                focusout: (e: Event) => this.handleInputBlur(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const loginElem: HTMLInputElement = document.querySelector('.login')!;
        const passwordElem: HTMLInputElement = document.querySelector('.password')!;
        loginElem.value = escape(loginElem.value);
        passwordElem.value = escape(passwordElem.value);
        console.log({
            login: loginElem.value,
            password: passwordElem.value
        });
        submitValidation([
            {
                elem: loginElem,
                validationType: 'login',
                errSelector: '.login-err'
            },
            {
                elem: passwordElem,
                validationType: 'password',
                errSelector: '.password-err'
            }
        ]);
    }

    handleInputBlur(e: Event) {
        e.stopPropagation();
        const loginElem: HTMLInputElement = document.querySelector('.login')!;
        const passwordElem: HTMLInputElement = document.querySelector('.password')!;
        if (e.target === loginElem) {
            blurValidation({
                elem: loginElem,
                validationType: 'login',
                errSelector: '.login-err'
            })
        }
        if (e.target === passwordElem) {
            blurValidation({
                elem: passwordElem,
                validationType: 'password',
                errSelector: '.password-err'
            })
        }
    }

    handleClick(e: Event) {
        e.preventDefault();
        const noAccountLink: HTMLAnchorElement = document.querySelector('.log-in-no-account-link')!;
        if(e.target === noAccountLink){
            router().go('/sign_in');
        }
    }

    render() {
        const {loginInput, passwordInput, submitButton} = this.props;
        return template({
            inputLogin: loginInput.render(),
            inputPassword: passwordInput.render(),
            submitButton: submitButton.render()
        });
    }
}

