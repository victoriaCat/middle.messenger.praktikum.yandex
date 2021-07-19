import {Router} from './router';

import {expect} from 'chai';
import jsdom from 'jsdom-global';
import {Error404} from '../../blocks/errorPage/error404';
import {Error500} from '../../blocks/errorPage/error500';

const index = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Index</title>
    <link rel="stylesheet" href="index.less">
    <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
</head>
<body>
<div class="app"></div>
<script src="index.ts" type="module"></script>
</body>
</html>`;

describe('Testing Router module', () => {
    let router: Router;

    before(function () {
        this.jsdom = jsdom(index, {url: 'http://localhost'});
    });

    beforeEach(function () {
        window.history.pushState({name: 'not found'}, 'not found', 'http://localhost/404');
        window.history.pushState({name: 'error'}, 'error', 'http://localhost/500');
        router = new Router('.app');
        router
            .use('/404', Error404)
            .use('/500', Error500)
            .start();
    });

    it('History length of Router should be increased', () => {
        const startLength = router["history"]!.length;
        window.history.pushState({}, 'test1', 'http://localhost/test1');
        window.history.pushState({}, 'test2', 'http://localhost/test2');
        expect(router["history"]!.length).to.eq(startLength + 2);
    });

    it('Method "go" should return chosen pathname', () => {
        const expectedResult = 'http://localhost/500';
        router.go('/500');
        expect(window.location.href).be.equal(expectedResult);
    });

    it('Method "back" should return previous pathname', done => {
        const expectedResult = 'http://localhost/404';
        router.back();
        window.onpopstate = () => {
            expect(window.location.href).be.equal(expectedResult);
            done();
        };
    });

    it('Method "getRoute" should return chosen route ', () => {
        const expectedResult = '/404';
        // @ts-ignore
        const result = router.getRoute(expectedResult)?._pathname;
        expect(result).be.equal(expectedResult);
    });

});
