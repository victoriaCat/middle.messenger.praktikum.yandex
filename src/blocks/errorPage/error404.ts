import Handlebars from 'handlebars';
import Block from '../../modules/block/block';
import {source} from './error404.tmpl';

export class Error404 extends Block {
    constructor() {
        super('main', {})
    }

    render() {
        return Handlebars.compile(source)({});
    }
}
