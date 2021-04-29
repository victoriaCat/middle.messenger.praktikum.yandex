import {source as inputTemplate} from '../../components/input/input.tmpl';

const source = `<div class="sign-in-page">
        <div class="sign-in-block">
            <h1 class="sign-in-header basic-header">Регистрация</h1>
            <form class="sign-in-form" action="" id="form-root">
                {{#each inputs}}
                    ${inputTemplate}
                {{/each}}
                {{{submitButton}}}
            </form>
            <a href="/" class="sign-in-link-to-log-in basic-link">Войти</a>
        </div>
    </div>`;

export const template = Handlebars.compile(source);