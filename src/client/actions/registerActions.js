import { APIFetch } from 'utils';
import { actionUtils } from 'utils';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const register = body =>
    actionUtils.RestAPIAction({
        url: '/user',
        options: {
            body
        },
        method: 'post',
        actionKey: 'REGISTER'
    });
