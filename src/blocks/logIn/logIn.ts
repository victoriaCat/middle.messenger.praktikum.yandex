import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {Input} from '../../components/input/input';
import {ActionTypes, GlobalStore} from '../../modules/store';
import {submitValidation, blurValidation} from '../../modules/styleValidation';
import {template} from './logIn.tmpl';
import {auth} from '../../api/authAPI';
import escape from '../../modules/escape';
import router from '../../../static';

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
                focusout: (e: Event) => this.handleInputBlur(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    async componentDidMount() {
        try {
            const userInfo = await auth.userInfo();
            if (userInfo) {
                router().go('/chats');
            }
        } catch (e) {
            console.log(e);
        }
    }

    async handleSubmit(e: Event) {
        e.preventDefault();
        const loginElem: HTMLInputElement = document.querySelector('.login')!;
        const passwordElem: HTMLInputElement = document.querySelector('.password')!;
        loginElem.value = escape(loginElem.value);
        passwordElem.value = escape(passwordElem.value);
        try {
            await auth.signIn({
                data: {
                    login: loginElem.value,
                    password: passwordElem.value
                }
            });
            const userInfo = <XMLHttpRequest>await auth.userInfo();
            GlobalStore.dispatchAction(ActionTypes.GET_CURRENT_USER, JSON.parse(userInfo.response));
            router().go('/chats');
        } catch (e) {
            console.log(e);
        }
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
        const submitButton: HTMLElement = document.querySelector('.log-in-button')!;
        if (e.target === noAccountLink) {
            router().go('/sign_in');
        } else if (e.target === submitButton) {
            this.handleSubmit(e);
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

