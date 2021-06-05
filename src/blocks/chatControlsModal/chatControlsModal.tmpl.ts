const source = `<div class="add-remove-user modal-wrapper">
         <h2 class="add-remove-user-header">{{{modalHeader}}}</h2>
         <form class="add-remove-user-form modal-form">
             <label>Логин
                <input class="add-remove-user-login" type="text"/>
             </label>
             {{{submitButton}}}
         </form>
        <div class="submit-err">{{submitError}}</div>
    </div>`;

export const template = Handlebars.compile(source);
