import queryString, {isPlainObject} from '../queryString';

type PlainObject<T = unknown> = {
    [k in string]: T;
};

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

export type Options = {
    data?: PlainObject,
    method?: string,
    headers?: PlainObject,
    timeout?: number
} | PlainObject

export default class HTTPTransport {
    baseURL: string;

    constructor(baseURL: string = '') {
        this.baseURL = baseURL;
    }

    get = (url: string, options?: Options) => {
        return options ? this.request(this.baseURL + url + queryString(options!.data), {
                ...options,
                method: METHODS.GET
            }, options!.timeout)
            : this.request(this.baseURL + url, {method: METHODS.GET});
    };

    put = (url: string, options: Options = {}) => {
        return this.request(this.baseURL + url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(this.baseURL + url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url: string, options: Options) => {
        return this.request(this.baseURL + url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: Options = {}, timeout: number | unknown = 5000) => {
        const {method, data, headers} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (typeof method === "string") {
                xhr.open(method, url);
            }

            if (isPlainObject(headers)) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, <string>headers[key]);
                });
            } else {
                xhr.setRequestHeader('content-type', 'application/json')
            }

            if (typeof timeout === "number") {
                xhr.timeout = timeout;
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (!headers) {
                xhr.send(JSON.stringify(data));
            } else {
                // @ts-ignore
                xhr.send(data);
            }
        });
    };
}
