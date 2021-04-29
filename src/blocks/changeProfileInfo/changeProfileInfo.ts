import Block from '../../modules/block';
import {Button} from '../../components/button/button';
import {submitValidation, blurValidation, validatedInput} from '../../modules/styleValidation';
import {template} from './changeProfileInfo.tmpl';
import escape from '../../modules/escape';

export class ChangeProfileInfo extends Block{
    constructor(){
        super('main', {
            inputs: [
                {
                    name: 'Почта',
                    type: 'email',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data email',
                    placeholder: 'pochta\@yandex\.ru',
                    errClass: 'email-err',
                    validationType: 'email',
                    errSelector: '.email-err'
                },
                {
                    name: 'Логин',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data login',
                    placeholder: 'ivanivanov',
                    errClass: 'login-err',
                    validationType: 'login',
                    errSelector: '.login-err'
                },
                {
                    name: 'Имя',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data first-name',
                    placeholder: 'Иван',
                    errClass: 'first-name-err',
                    validationType: 'first_name',
                    errSelector: '.first-name-err'
                },
                {
                    name: 'Фамилия',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data second-name',
                    placeholder: 'Иванов',
                    errClass: 'second-name-err',
                    validationType: 'second_name',
                    errSelector: '.second-name-err'
                },
                {
                    name: 'Имя в чате',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data nickname',
                    placeholder: 'Иван',
                    errClass: 'nickname-err',
                    validationType: 'nickname',
                    errSelector: '.nickname-err'
                },
                {
                    name: 'Телефон',
                    type: 'tel',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data phone',
                    placeholder: '\+7\(909\)9673030',
                    errClass: 'phone-err',
                    validationType: 'phone',
                    errSelector: '.phone-err'
                }
            ],
            submitButton: new Button({
                class: 'change-profile-save basic-button',
                type: 'submit',
                text: 'Сохранить'
            }),
            events: {
                submit: (e:Event) => this.handleSubmit(e),
                focusout: (e:Event) => this.handleInputBlur(e)
            }
        });
    }

    defineInputs = (inputs: validatedInput[]) => {
        const emailElem: HTMLInputElement | null = document.querySelector('.email');
        const logInElem: HTMLInputElement | null = document.querySelector('.login');
        const firstNameElem: HTMLInputElement | null = document.querySelector('.first-name');
        const secondNameElem: HTMLInputElement | null = document.querySelector('.second-name');
        const phoneElem: HTMLInputElement | null = document.querySelector('.phone');
        const nicknameElem: HTMLInputElement | null = document.querySelector('.nickname');

        inputs[0]['elem'] = emailElem;
        inputs[1]['elem'] = logInElem;
        inputs[2]['elem'] = firstNameElem;
        inputs[3]['elem'] = secondNameElem;
        inputs[4]['elem'] = phoneElem;
        inputs[5]['elem'] = nicknameElem;
    }

    handleSubmit(e: Event){
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
            nickname: inputs[5].elem!.value
        });
        submitValidation(inputs);
    }

    handleInputBlur(e: Event) {
        e.stopPropagation();
        const {inputs} = this.props;
        this.defineInputs(inputs);
        inputs.forEach((input: validatedInput) => {
            if(e.target === input.elem){
                blurValidation(input);
            }
        })
    }

    render(){
        const {inputs, submitButton} = this.props;
        return template({
            inputs,
            submitButton: submitButton.render()
        })
    }
}