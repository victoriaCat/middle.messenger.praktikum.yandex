const source = `<div class="chats-page">
        <div class="chats-menu">
            <div class="chats-to-profile">
                <a class="profile-link" href="/profile">
                    <div class="profile-link-text">Профиль</div>
                    <img class="profile-link-arrow" src="assets/icons/simple-arrow-right.svg" alt="Профиль">
                </a>
            </div>
            <input class="search-chats" type="search" placeholder="Поиск">
            <div class="chats">
            {{#if chats}}
                {{#each chats}}
                    <li class="chat-item-wrapper">
                        <a class="chat-item" href="" onclick="return false;" data-chat-id={{id}}>
                            <div class="chat-item-left-side">
                                {{#if avatar}}
                                <img src={{avatar}} alt="Картинка чата"/>
                                {{else}}
                                    <div class="chat-picture"></div>
                                {{/if}}
                                <div class="chat-description">
                                    <div class="chat-name">{{title}}</div>
                                    <div class="last-message-preview">
                                    {{#if fromYou}}
                                        <span class="is-from-you">Вы: </span>
                                    {{/if}}{{last_message.content}}
                                    </div>
                                </div>
                            </div>
                            <div class="chat-item-right-side">
                                <div class="last-message-time">{{last_message.time}}</div>
                                {{#if unread_count}}
                                <div class="unread-amount">{{unread_count}}</div>
                                {{/if}}
                            </div>
                        </a>
                    </li>
                {{/each}}
            {{else}}
                <div class="no-chats-yet">У вас ещё нет чатов</div>
                <button class="create-new-chat">Создать чат</button>
            {{/if}}
            </div>
        </div>
        <div class="chat-window">
            <div class="choose">Выберите чат, чтобы отправить сообщение</div>
        </div>
 </div>`;

export const template = Handlebars.compile(source);

