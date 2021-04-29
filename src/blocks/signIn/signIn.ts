import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {submitValidation, blurValidation, validatedInput} from '../../modules/styleValidation';
import {template} from './signIn.tmpl';
import escape from '../../modules/escape';
import router from '../../modules/router/router';

export class SignIn extends Block {
    constructor() {
        super('main', {
            inputs: [
                {
                    name: 'Почта',
                    type: 'email',
                    inputClass: 'email basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'email-err',
                    errSelector: '.email-err',
                    validationType: 'email'
                },
                {
                    name: 'Логин',
                    type: 'text',
                    inputClass: 'login basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'login-err',
                    errSelector: '.login-err',
                    validationType: 'login'
                },
                {
                    name: 'Имя',
                    type: 'text',
                    inputClass: 'first-name basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'first-name-err',
                    errSelector: '.first-name-err',
                    validationType: 'first_name'
                },
                {
                    name: 'Фамилия',
                    type: 'text',
                    inputClass: 'second-name basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'second-name-err',
                    errSelector: '.second-name-err',
                    validationType: 'second_name'
                },
                {
                    name: 'Телефон',
                    type: 'tel',
                    inputClass: 'phone basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'phone-err',
                    errSelector: '.phone-err',
                    validationType: 'phone'
                },
                {
                    name: 'Пароль',
                    type: 'password',
                    inputClass: 'password basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'password-err',
                    errSelector: '.password-err',
                    validationType: 'password'
                },
                {
                    name: 'Пароль (ещё раз)',
                    type: 'password',
                    inputClass: 'password-second basic-input',
                    labelClass: 'sign-in-label basic-label',
                    errClass: 'password-second-err',
                    errSelector: '.password-second-err',
                    validationType: 'password'
                }
            ],
            submitButton: new Button({
                class: 'sign-in-button basic-button',
                type: 'submit',
                text: 'Зарегистрироваться',
                events: {
                    click: () => {
                        submitValidation(this.props.inputs);
                    }
                },
            }),
            events: {
                submit: (e: Event) => this.handleSubmit(e),
                focusout: (e: Event) => this.handleInputBlur(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    defineInputs = (inputs: validatedInput[]) => {
        const emailElem: HTMLInputElement | null = document.querySelector('.email');
        const loginElem: HTMLInputElement | null = document.querySelector('.login');
        const firstNameElem: HTMLInputElement | null = document.querySelector('.first-name');
        const secondNameElem: HTMLInputElement | null = document.querySelector('.second-name');
        const phoneElem: HTMLInputElement | null = document.querySelector('.phone');
        const passwordElem: HTMLInputElement | null = document.querySelector('.password');
        const passwordSecondElem: HTMLInputElement | null = document.querySelector('.password-second');

        inputs[0]['elem'] = emailElem;
        inputs[1]['elem'] = loginElem;
        inputs[2]['elem'] = firstNameElem;
        inputs[3]['elem'] = secondNameElem;
        inputs[4]['elem'] = phoneElem;
        inputs[5]['elem'] = passwordElem;
        inputs[6]['elem'] = passwordSecondElem;
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const {inputs} = this.props;
        this.defineInputs(inputs);
        inputs.forEach((input: validatedInput) => input.elem!.value = escape(input.elem!.value));
        console.log({
            email: inputs[0].elem.value,
            login: inputs[1].elem.value,
            first_name: inputs[2].elem.value,
            second_name: inputs[3].elem.value,
            phone: inputs[4].elem.value,
            password: inputs[5].elem.value
        });
        submitValidation(inputs);
    }

    handleInputBlur(e: Event) {
        const {inputs} = this.props;
        this.defineInputs(inputs);
        e.stopPropagation();
        inputs.forEach((input: validatedInput) => {
            if(e.target === input.elem){
                blurValidation(input);
            }
        })
    }

    handleClick(e: Event) {
        e.preventDefault();
        const signInToLogInLink: HTMLAnchorElement = document.querySelector('.sign-in-link-to-log-in')!;
        if(e.target === signInToLogInLink){
            router().go('/');
        }
    }

    render() {
        const {inputs, submitButton} = this.props;
        return template({
            inputs: inputs,
            submitButton: submitButton.render()
        });
    }
}