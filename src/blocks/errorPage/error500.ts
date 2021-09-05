import Block from '../../modules/block/block';
import {source} from './error500.tmpl';

export class Error500 extends Block {
    constructor() {
        super('main', {})
    }

    render() {
        return source;
    }
}
