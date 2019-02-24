import { reducerUtils } from 'utils';

const initialState = {
    user: false,
    userFetching: false,
    userError: false,
    latestUsers: [],
    latestFetching: false,
    latestError: false
};

export default function userReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;
    return resolveReducer(state, action, {
        ...restAPIReducer({
            actionKey: 'USER',
            startKey: 'userFetching',
            successKey: 'user',
            errorKey: 'userError',
            usePayload: true
        }),
        ...restAPIReducer({
            actionKey: 'LATEST_USERS',
            startKey: 'latestFetching',
            successKey: 'latestUsers',
            errorKey: 'latestError',
            usePayload: true
        }),
        ADD_REQUEST_ID: (state, action) => ({
            ...state,
            user: {
                ...state.user,
                requestIds: state.user.requestIds.concat(action.payload)
            }
        }),
        ADD_CONTACT_ID: (state, action) => ({
            ...state,
            user: {
                ...state.user,
                contactIds: state.user.contactIds.concat(action.payload)
            }
        }),
        REMOVE_REQUEST_ID: (state, action) => ({
            ...state,
            user: {
                ...state.user,
                requestIds: state.user.requestIds.filter(
                    id => id !== action.payload
                )
            }
        })
    });
}
