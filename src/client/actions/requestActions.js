import { APIFetch } from 'utils';
import { actionUtils } from 'utils';
import { ADD_CONTACT_ID, ADD_CONTACT } from 'actions/contactActions.js';

export const SEND_REQUEST_START = 'SEND_REQUEST_START';
export const SEND_REQUEST_SUCCESS = 'SEND_REQUEST_SUCCESS';
export const SEND_REQUEST_ERROR = 'SEND_REQUEST_ERROR';

export const ACCEPT_REQUEST_START = 'ACCEPT_REQUEST_START';
export const ACCEPT_REQUEST_SUCCESS = 'ACCEPT_REQUEST_SUCCESS';
export const ACCEPT_REQUEST_ERROR = 'ACCEPT_REQUEST_ERROR';

export const DECLINE_REQUEST_START = 'DECLINE_REQUEST_START';
export const DECLINE_REQUEST_SUCCESS = 'DECLINE_REQUEST_SUCCESS';
export const DECLINE_REQUEST_ERROR = 'DECLINE_REQUEST_ERROR';

export const SET_REQUESTS = 'SET_REQUESTS';
export const ADD_REQUEST_ID = 'ADD_REQUEST_ID';
export const REMOVE_REQUEST_ID = 'REMOVE_REQUEST_ID';

export const sendRequest = body =>
    actionUtils.RestAPIAction({
        url: '/request',
        options: {
            body
        },
        method: 'post',
        actionKey: 'SEND_REQUEST',
        successCallback: (dispatch, getState, payload) => {
            dispatch({ type: ADD_REQUEST_ID, payload: payload.id });

            return {
                ...getState().request.requests,
                [payload.id]: payload
            };
        }
    });

export const acceptRequest = id =>
    actionUtils.RestAPIAction({
        url: `/request/${id}/accept`,
        method: 'put',
        actionKey: 'ACCEPT_REQUEST',
        successCallback: (dispatch, getState, payload) => {
            dispatch({ type: REMOVE_REQUEST_ID, payload: id });
            dispatch({ type: ADD_CONTACT, payload: payload });
            dispatch({ type: ADD_CONTACT_ID, payload: payload.id });
            const updatedRequests = getState().request.requests;
            delete updatedRequests[id];
            return updatedRequests;
        }
    });

export const declineRequest = id =>
    actionUtils.RestAPIAction({
        url: `/request/${id}/decline`,
        method: 'delete',
        actionKey: 'DECLINE_REQUEST',
        successCallback: (dispatch, getState, payload) => {
            dispatch({ type: REMOVE_REQUEST_ID, payload: id });
            const updatedRequests = getState().request.requests;
            delete updatedRequests[id];
            return updatedRequests;
        }
    });
