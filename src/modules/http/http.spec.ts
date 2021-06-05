import HTTPTransport from './http';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Testing HTTPTransport module', () => {
  let request: HTTPTransport;

  beforeEach(() => {
    request = new HTTPTransport('http://localhost');
  });

  it('Method "get" should return request with correct params', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.get('/test');

    expect(requestSpy).to.have.been.calledWith('http://localhost/test', { method: 'GET' });
  });

  it('Method "post" should return request with correct params', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.post('/test', {});

    expect(requestSpy).to.have.been.calledWith('http://localhost/test', { method: 'POST' });
  });

  it('Method "put" should return request with correct params', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.put('/test', {});

    expect(requestSpy).to.have.been.calledWith('http://localhost/test', { method: 'PUT' });
  });

  it('Method "delete" should return request with correct params', () => {
    const requestSpy = sinon.spy(request, 'request');
    request.delete('/test', {});

    expect(requestSpy).to.have.been.calledWith('http://localhost/test', { method: 'DELETE' });
  });
});
