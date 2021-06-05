import Block, {renderBlock} from './block';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import jsdom from 'jsdom-global';

chai.use(sinonChai);

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

class TestBlock extends Block {
    render() {
        return 'test';
    }
}

describe('Testing Block module', () => {
    before(function () {
        this.jsdom = jsdom(index, {url: 'http:localhost'});
    })

    it('Function "renderBlock" should render test component', () => {
        const expectedResult = `<div class="test">test</div>`;
        renderBlock('.app', new TestBlock('div', {className: 'test'}))
        expect(document.querySelector('.app')!.innerHTML).to.be.equal(expectedResult);
    });

    it('Changing props should trigger "render" method', () => {
        const newProp = {text: 'test'};
        const testBlock = new TestBlock();
        const renderSpy = sinon.spy(testBlock, 'render');
        testBlock.setProps(newProp);
        expect(renderSpy).to.have.been.called;
    });
})

