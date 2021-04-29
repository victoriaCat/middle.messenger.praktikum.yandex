const source =` <div class="server-error-page">
        <div class="error-block">
            <h1 class="error-code">500</h1>
            <h2 class="error-comment basic-header">Мы уже фиксим</h2>
            <a class="error-return-to-chats-link basic-link" href="/chats">Назад к чатам</a>
        </div>
</div>`;

export const template = Handlebars.compile(source);