import Block from '../../modules/block/block';
import {Button} from '../../components/button/button';
import {ChangeAvatar} from '../changeAvatar/changeAvatar';
import {submitValidation, blurValidation, validatedInput} from '../../modules/styleValidation';
import {template} from './changeProfileInfo.tmpl';
import escape from '../../modules/escape';
import {users} from '../../api/usersAPI';
import {auth} from '../../api/authAPI';

export class ChangeProfileInfo extends Block {
    constructor() {
        super('main', {
            userData: {},
            inputs: [
                {
                    name: 'Почта',
                    type: 'email',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data email',
                    placeholder: '',
                    errClass: 'email-err',
                    validationType: 'email',
                    errSelector: '.email-err'
                },
                {
                    name: 'Логин',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data login',
                    placeholder: '',
                    errClass: 'login-err',
                    validationType: 'login',
                    errSelector: '.login-err'
                },
                {
                    name: 'Имя',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data first-name',
                    placeholder: '',
                    errClass: 'first-name-err',
                    validationType: 'first_name',
                    errSelector: '.first-name-err'
                },
                {
                    name: 'Фамилия',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data second-name',
                    placeholder: '',
                    errClass: 'second-name-err',
                    validationType: 'second_name',
                    errSelector: '.second-name-err'
                },
                {
                    name: 'Имя в чате',
                    type: 'text',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data nickname',
                    placeholder: '',
                    errClass: 'nickname-err',
                    validationType: 'nickname',
                    errSelector: '.nickname-err'
                },
                {
                    name: 'Телефон',
                    type: 'tel',
                    labelClass: 'user-info-label',
                    inputClass: 'user-info-data phone',
                    placeholder: '',
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
                submit: (e: Event) => this.handleSubmit(e),
                focusout: (e: Event) => this.handleInputBlur(e),
                click: (e: Event) => this.handleClick(e)
            }
        });
    }

    componentDidMount() {
        // @ts-ignore
        auth.userInfo().then(result => this.setProps({...this.props, userData: JSON.parse(result.response)}))
            .catch(console.log);

        this.definePlaceholders();
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

    definePlaceholders() {
        Object.keys(this.props.userData).forEach(key => {
            this.props.inputs.forEach((input: { [x: string]: any; }) => {
                if ((input.validationType === 'nickname' && key === 'display_name') || input.validationType === key) {
                    input['placeholder'] = this.props.userData[key];
                }
            })
        })
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        if (e.target === document.querySelector('.change-user-info')) {
            const {inputs} = this.props;
            this.defineInputs(inputs);
            inputs.forEach((input: validatedInput) => input.elem!.value = escape(input.elem!.value));
            const userData = {
                email: inputs[0].elem.value,
                login: inputs[1].elem.value,
                first_name: inputs[2].elem.value,
                second_name: inputs[3].elem.value,
                phone: inputs[4].elem.value,
                display_name: inputs[5].elem.value
            };
            users.changeInfo({
                data: userData
            }).catch(console.log);
            submitValidation(inputs);
        }
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

    handleClick(e: Event) {
        if (e.target === document.querySelector('.change-picture')) {
            e.preventDefault();
            const modal = document.querySelector('.modal');
            if (modal) {
                modal!.classList.remove('hide');
            } else {
                const changeAvatarModal = new ChangeAvatar();
                document.querySelector('.app main')!.appendChild(changeAvatarModal.getContent()!);
            }
        }
    }

    render() {
        const {inputs, submitButton} = this.props;
        return template({
            inputs,
            avatar: this.props.userData.avatar || 'assets/icons/profile-picture.svg',
            submitButton: submitButton.render()
        })
    }
}
