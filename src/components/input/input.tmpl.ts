export const source = `<label class="{{labelClass}}">{{name}}
    <input class="{{inputClass}}" type="{{type}}" {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}>
    <div class="input-err {{errClass}}"></div>
</label>`;

export const template = Handlebars.compile(source);