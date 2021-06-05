const source = `<div class="modal">
    <div class="change-avatar modal-wrapper">
         <form class="change-avatar-form modal-form" enctype="multipart/form-data">
             <div class="choose-pic">
             <h2 class="change-avatar-header">{{header}}</h2>
             <input type="file" id="avatar" accept=".jpg, .jpeg, .png">
             </div>
             <div class="pic-name">{{picName}}</div>
             {{{submitButton}}}
         </form>
        <div class="submit-err">{{submitError}}</div>
    </div>
</div>`;

export const template = Handlebars.compile(source);
