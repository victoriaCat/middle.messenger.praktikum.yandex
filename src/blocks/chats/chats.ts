import Block from '../../modules/block';
import {template} from './chats.tmpl';

type message = {
    time: string,
    incoming: boolean,
    text: string,
    attachments: string | null
}

export class Chats extends Block {
    constructor() {
        super('main', {
            chats: [
                {
                    image: null,
                    name: 'Андрей',
                    lastMessage: 'Изображение',
                    fromYou: false,
                    lastMessageTime: '10:49',
                    unreadAmount: 2,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Киноклуб',
                    lastMessage: 'стикер',
                    fromYou: true,
                    lastMessageTime: '12:00',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Илья',
                    lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
                    fromYou: false,
                    lastMessageTime: '15:12',
                    unreadAmount: 4,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Вадим',
                    lastMessage: 'Круто!',
                    fromYou: true,
                    lastMessageTime: 'Пт',
                    unreadAmount: 0,
                    chatHistory: {
                        '19.06': [
                            {
                                time: '11:56',
                                incoming: true,
                                text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                                    '\n' +
                                    'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
                                attachments: null
                            },
                            {
                                time: '11:56',
                                incoming: true,
                                text: '',
                                attachments: '../../assets/images/example.png'
                            },
                            {
                                time: '12:00',
                                incoming: false,
                                text: 'Круто!',
                                attachments: null
                            }
                        ]
                    }
                },
                {
                    image: null,
                    name: 'тет-а-теты',
                    lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют...',
                    fromYou: false,
                    lastMessageTime: 'Ср',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: '1, 2, 3',
                    lastMessage: 'Миллионы россиян ежедневно проводят десятки часов свое...',
                    fromYou: false,
                    lastMessageTime: 'Пн',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Design Destroyer',
                    lastMessage: 'В 2008 году художник Jon Rafman  начал собирать...',
                    fromYou: false,
                    lastMessageTime: 'Пн',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Day.',
                    lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
                    fromYou: false,
                    lastMessageTime: '1 Мая 2020',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Стас Рогозин',
                    lastMessage: 'Можно или сегодня или завтра вечером.',
                    fromYou: false,
                    lastMessageTime: '12 Апр 2020',
                    unreadAmount: 0,
                    chatHistory: {}
                },
                {
                    image: null,
                    name: 'Комбуча',
                    lastMessage: 'ок',
                    fromYou: true,
                    lastMessageTime: '10 Июня 2020',
                    unreadAmount: 0,
                    chatHistory: {}
                }
            ]
        });
    }

    chatHistory = this.props.chats[3].chatHistory['19.06'].map((message: message) => `
        ${message.incoming ?
            `<div class="message left-side-message">
                ${message.text || `<img class="message-attachment" src=${message.attachments} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
            </div>` :
            `<div class="message right-side-message">
                ${message.text || `<img class="message-attachment" src=${message.attachments} alt="Вложение">`}
                <div class="message-time">${message.time}</div>
                <img class="message-sent" src="../../assets/icons/sent.svg" alt="Отправлено">
            </div>`}
        `).join('');

    render() {
        const {chats} = this.props;
        return template({
            chats
        })
    }
}


