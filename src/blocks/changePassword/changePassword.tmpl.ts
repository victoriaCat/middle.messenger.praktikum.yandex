import {source as inputTemplate} from '../../components/input/input.tmpl';

const source = `<div class="change-password-page">
        <div class="profile-back-to-chats-block">
            <button class="profile-back-to-chats-button">
                <a class="profile-back-to-chats-link" href="/chats">
                    <img src="assets/icons/arrow-left.svg" alt="Назад">
                </a>
            </button>
        </div>
        <div class="profile-container">
            <div class="change-profile-user-picture">
                <img class="user-picture-default-icon" src="assets/icons/profile-picture.svg" alt="Фото">
            </div>
            <form class="change-user-info" action="" id="form-root">
                {{#each inputs}}
                    ${inputTemplate}
                {{/each}}
                {{{submitButton}}}
            </form>
        </div>
</div>`;

export const template = Handlebars.compile(source);

