import Block from '../../modules/block';
import {template} from './error500.tmpl';

export class Error500 extends Block {
    constructor() {
        super('main', {})
    }

    render() {
        return template({})
    }
}