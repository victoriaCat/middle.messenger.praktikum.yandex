const source = `<div class="chats-page">
        <div class="chats-menu">
            <div class="chats-to-profile">
                <a class="profile-link" href="/profile">
                    <div class="profile-link-text">Профиль</div>
                    <img class="profile-link-arrow" src="/assets/icons/simple-arrow-right.svg" alt="Профиль">
                </a>
            </div>
            <input class="search-chats" type="search" placeholder="Поиск">
            <div class="chats">
                {{#each chats}}
                    <div class="chat-item-wrapper">
                        <a class="chat-item" href="" onclick="return false;">
                            <div class="chat-item-left-side">
                                {{#if image}}
                                    <img src="{{image}} alt="Картинка чата"/>
                                {{else}}
                                    <div class="chat-picture"></div>
                                {{/if}}
                                <div class="chat-description">
                                    <div class="chat-name">{{name}}</div>
                                    <div class="last-message-preview">
                                        {{#if fromYou}}
                                            <span class="is-from-you">Вы: </span>
                                        {{/if}}{{lastMessage}}
                                    </div>
                                </div>
                            </div>
                            <div class="chat-item-right-side">
                                <div class="last-message-time">{{lastMessageTime}}</div>
                                {{#if unreadAmount}}
                                    <div class="unread-amount">{{unreadAmount}}</div>
                                {{/if}}
                            </div>
                        </a>
                    </div>
                {{/each}}
            </div>
        </div>
        <div class="chat-window">
            <div class="chat-header">
                <div class="chat-header-left">
                    <div class="chat-picture"></div>
                    <div class="chat-name">Вадим</div>
                </div>
                <button class="chat-options">
                    <img src="/assets/icons/more.svg" alt="Функции чата">
                </button>
            </div>
            <div class="chat-history">
                {{{chatHistory}}}
            </div>
            <div class="message-bar">
                <button class="select-file">
                    <img src="/assets/icons/clip.svg" alt="Прикрепить">
                </button>
                <input class="message-input" type="text" placeholder="Сообщение">
                <button class="send-button">
                    <img src="/assets/icons/arrow-right.svg" alt="Отправить">
                </button>
            </div>
        </div>
</div>`;

export const template = Handlebars.compile(source);