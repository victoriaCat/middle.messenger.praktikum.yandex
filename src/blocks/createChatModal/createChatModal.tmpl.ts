const source = `<div class="create-chat modal-wrapper">
         <form class="create-chat-form modal-form">
             <div class="choose-pic">
             <h2 class="create-chat-header">Введите название чата</h2>
             <input class="chat-title" type="text" id="avatar"/>
             </div>
             {{{submitButton}}}
         </form>
        <div class="submit-err">{{submitError}}</div>
    </div>`;

export const template = Handlebars.compile(source);
