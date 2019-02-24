import { actionUtils, arrayToObject } from 'utils';

export const USER_START = 'GET_SELF_START';
export const USER_SUCCESS = 'GET_SELF_SUCCESS';
export const USER_ERROR = 'GET_SELF_ERROR';

export const getSelf = req => async (dispatch, getState) => {
    await actionUtils.RestAPIAction({
        url: '/user/me',
        options: {},
        method: 'get',
        actionKey: 'USER',
        req,
        successCallback: (
            dispatch,
            getState,
            { requests, contacts, ...payload }
        ) => {
            const normalizedRequests = arrayToObject(requests);
            const normalizedContacts = arrayToObject(contacts);
            dispatch({ type: 'SET_REQUESTS', payload: normalizedRequests });
            dispatch({ type: 'SET_CONTACTS', payload: normalizedContacts });
            return {
                ...payload,
                requestIds: requests.map(r => r.id),
                contactIds: contacts.map(c => c.id)
            };
        }
    })(dispatch, getState);
};

export const getLatestUsers = req =>
    actionUtils.RestAPIAction({
        url: '/user/latest',
        options: {},
        method: 'get',
        actionKey: 'LATEST_USERS',
        req
    });
