export function validate(value: string, type: string): { validate: boolean, error: string } {
    let validate: boolean = true;
    let error = '';

    const textRegexp = /^[a-z_0-9]+$/i;
    const emailRegexp = /^[0-9a-z\-\.]+\@[0-9a-z\-]{2,}\.[a-z]{2,}$/i;
    const phoneRegexp = /^(\+7|8)[0-9]{10}$/i;
    const nameRegexp = /^[a-zа-яё]{2,}$/i;
    const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z0-9!@#$%^&*]{6,}$/i;

    if (type === 'login' || type === 'nickname') {
        validate = textRegexp.test(value);
        error = validate ? '' : 'Неверный логин';
    }
    if (type === 'email') {
        validate = emailRegexp.test(value);
        error = validate ? '' : 'Неверная почта';
    }
    if (type === 'phone') {
        validate = phoneRegexp.test(value);
        error = validate ? '' : 'Неверный номер';
    }
    if (type === 'first_name' || type === 'second_name') {
        validate = nameRegexp.test(value);
        error = validate ? '' : 'Используйте только буквы';
    }
    if (type === 'password') {
        validate = passwordRegexp.test(value);
        error = validate ? '' : 'Неверный пароль';
    }
    return {
        validate,
        error
    };
}