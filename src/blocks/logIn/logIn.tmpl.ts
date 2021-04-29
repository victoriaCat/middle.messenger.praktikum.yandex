let source = `<div class="log-in-page">
    <div class="log-in-block">
        <h1 class="log-in-header basic-header">Вход</h1>
        <form class="log-in-form" action="">
            <div class="log-in-fields">
                {{{inputLogin}}}
                {{{inputPassword}}}
            </div>
            {{{submitButton}}}
        </form>
        <a href="/sign_in" class="log-in-no-account-link basic-link">Нет аккаунта?</a>
    </div>
</div>`;

export const template = Handlebars.compile(source);