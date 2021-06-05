import Block from '../../modules/block/block';
import {template} from './input.tmpl';

export type inputType = {
    [key: string]: any
}

export class Input extends Block {
    constructor(props: inputType) {
        super("div", props);
    }

    render() {
        return template(this.props);
    }
}
