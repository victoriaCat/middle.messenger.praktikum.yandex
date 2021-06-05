import {source as inputTemplate} from '../../components/input/input.tmpl';

const source = `<div class="change-profile">
    <div class="profile-back-to-chats-block">
        <button class="profile-back-to-chats-button">
            <a class="profile-back-to-chats-link" href="/chats">
                <img src="assets/icons/arrow-left.svg" alt="Назад"/\>
            </a>
        </button>
    </div>
    <div class="profile-container">
        <div class="profile-change-picture">
            <a class="profile-change-picture-link" href="">
                <div class="user-picture">
                    <img class="user-picture-default-icon" src={{avatar}} alt="Фото профиля"/>
                </div>
                <div class="change-picture">
                    Поменять аватар
                </div>
            </a>
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
