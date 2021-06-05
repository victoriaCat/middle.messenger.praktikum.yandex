import Block from '../../modules/block/block';
import {template} from './button.tmpl';

export class Button extends Block {
    constructor(props: {}) {
        super("div", props);
    }

    render() {
        return template(this.props);
    }
}
