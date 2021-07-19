const source = `<button class="{{class}}" {{#if type}}type="{{type}}"{{/if}}>{{text}}</button>`;

export const template = Handlebars.compile(source);
