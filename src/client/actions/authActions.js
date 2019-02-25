import Router from 'next/router';

import { APIFetch } from 'utils';
import { actionUtils } from 'utils';
import { getSelf } from 'actions/userActions.js';
import { createSocketConnexion, closeSocketConnexion } from 'utils/sockets.js';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const login = body => async dispatch => {
    await actionUtils.RestAPIAction({
        url: '/login',
        options: {
            body
        },
        method: 'post',
        actionKey: 'LOGIN',
        successCallback: async (dispatch, getstate, payload) => {
            Router.push('/dashboard');
            await dispatch(getSelf());
            return payload;
        }
    })(dispatch);
};

export const logout = () => async dispatch => {
    await APIFetch.get('/logout');
    window.location.href = '/';
    // dispatch({ type: LOGOUT });
};
