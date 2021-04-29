import Block from '../../modules/block';
import {template} from './error404.tmpl';

export class Error404 extends Block {
    constructor() {
        super('main', {})
    }

    render() {
        return template({});
    }
}