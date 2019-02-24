import { APIFetch } from 'utils';
import { actionUtils } from 'utils';

export const ADD_CONTACT_ID = 'ADD_CONTACT_ID';
export const ADD_CONTACT = 'ADD_CONTACT';
export const CONTACT_LOGGED_IN = 'CONTACT_LOGGED_IN';
export const CONTACT_LOGGED_OUT = 'CONTACT_LOGGED_OUT';

export function onContactLogin(id) {
    return { type: CONTACT_LOGGED_IN, payload: id };
}

export function onContactLogout(id) {
    return { type: CONTACT_LOGGED_OUT, payload: id };
}
