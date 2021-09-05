const source = `<div class="chat-header">
                <div class="chat-header-left">
                    <img class="chat-picture" src={{chatAvatar}}/>
                    <div class="chat-name">{{chatTitle}}</div>
                </div>
                <button class="chat-options">
                    <img class="chat-options-icon" src="assets/icons/more.svg" alt="Функции чата">
                </button>
            </div>
            <div class="chat-history">
                {{{chatHistory}}}
            </div>
            <div class="message-bar">
                <button class="select-file">
                    <img src="assets/icons/clip.svg" alt="Прикрепить">
                </button>
                <input class="message-input" type="text" placeholder="Сообщение">
                <button class="send-button">
                    <img class="send-icon" src="assets/icons/arrow-right.svg" alt="Отправить">
                </button>
            </div>`;

export const template = Handlebars.compile(source);
