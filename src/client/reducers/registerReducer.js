import { reducerUtils } from 'utils';

const initialState = {
    success: false,
    registering: false,
    error: false
};

export default function registerReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(
        state,
        action,
        restAPIReducer({
            actionKey: 'REGISTER',
            startKey: 'registering',
            successKey: 'success',
            errorKey: 'error'
        })
    );
}
