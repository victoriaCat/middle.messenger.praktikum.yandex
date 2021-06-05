const source = `<div class="chat-controls-content">
    <li class="chat-controls-item add-user">
        <img class="chat-controls-add-icon" src="assets/icons/add.svg" alt="Добавить">
        <div>Добавить пользователя</div>
    </li>
    <li class="chat-controls-item remove-user">
        <img class="chat-controls-remove-icon" src="assets/icons/delete.svg" alt="Удалить">
        <div>Удалить пользователя</div>
    </li>
    <li class="chat-controls-item create-chat">
        <button class="add-new-chat-button">Добавить новый чат</button>
    </li>
</div>`;

export const template = Handlebars.compile(source);
