import {validate} from "./validation";

export type validatedInput = {
    elem: HTMLInputElement | null,
    type?: string,
    errSelector: string,
    labelClass?: string,
    name?: string,
    inputClass?: string,
    errClass?: string,
    validationType: string
}

export function blurValidation(input: validatedInput) {
    if (!validate(input.elem!.value, input.validationType).validate) {
        input.elem?.classList.add('validation-error');
        const errorBlock = document.querySelector(input.errSelector);
        errorBlock!.classList.add('show');
        errorBlock!.textContent = validate(input.elem!.value, input.validationType).error;
    }
}


export function submitValidation(inputs: validatedInput[]) {
    inputs.forEach(input => {
        blurValidation(input);
    })
}
