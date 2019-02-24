import { reducerUtils } from 'utils';

const initialState = {
    requests: {},
    sending: false,
    sendError: false,
    accepting: false,
    acceptError: false,
    declining: false,
    declineError: false
};

export default function requestReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(state, action, {
        ...restAPIReducer({
            actionKey: 'SEND_REQUEST',
            successKey: 'requests',
            startKey: 'sending',
            errorKey: 'sendError',
            usePayload: true
        }),
        ...restAPIReducer({
            actionKey: 'ACCEPT_REQUEST',
            successKey: 'requests',
            startKey: 'accepting',
            errorKey: 'acceptError',
            usePayload: true
        }),
        ...restAPIReducer({
            actionKey: 'DELINE_REQUEST',
            successKey: 'requests',
            startKey: 'declining',
            errorKey: 'declineError',
            usePayload: true
        }),
        SET_REQUESTS: (state, action) => ({
            ...state,
            requests: { ...state.requests, ...action.payload }
        })
    });
}
