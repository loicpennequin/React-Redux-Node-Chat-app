import { LOGOUT } from 'actions/authActions.js';
import { reducerUtils } from 'utils';

const initialState = {
    authenticated: false,
    authenticating: false,
    error: false
};

export default function authReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(state, action, {
        ...restAPIReducer({
            actionKey: 'LOGIN',
            startKey: 'authenticating',
            successKey: 'authenticated',
            errorKey: 'error'
        }),
        LOGOUT: state => ({ ...state, authenticated: false, error: false })
    });
}
