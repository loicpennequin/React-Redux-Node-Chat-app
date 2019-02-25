import 'isomorphic-fetch';
import paths from 'constants/paths.js';
import asyncConstants from 'constants/async.js';

const { FETCH_TIMEOUT, ASYNC_DELAY } = asyncConstants;

const _fetch = (url, options, req) =>
    new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);
        setTimeout(async () => {
            try {
                const _url = url.startsWith('http://')
                    ? url
                    : paths.BASE_API_URL + url;

                const _options = {
                    headers: Object.assign({}, {cookie: req && req.headers.cookie}),
                    ...options
                };

                const response = await fetch(_url, _options);
                clearTimeout(timeout);

                if (!response.ok) {
                    reject(await response.json());
                }
                resolve(await response.json());
            } catch (err) {
                reject(err);
            }
        }, ASYNC_DELAY);
    });

export default {
    get: (url, options = {}, req = undefined) => _fetch(url, options, req),
    post: (url, options = {}, req = undefined) =>
        _fetch(
            url,
            {
                ...options,
                body: JSON.stringify(options.body),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            req
        ),
    put: (url, options = {}, req = undefined) =>
        _fetch(
            url,
            {
                ...options,
                body: JSON.stringify(options.body),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            req
        ),
    deletet: (url, options = {}, req = undefined) =>
        _fetch(url, { ...options, method: 'DELETE' }, req)
};
