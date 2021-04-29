import Block from '../../modules/block';
import {template} from './profile.tmpl';

export class Profile extends Block{
    constructor(){
        super('main', {})
    }

    render(){
        return template({})
    }
}