import { reducerUtils } from 'utils';

const initialState = {
    profile: false,
    isOwnProfile: false,
    isContact: false,
    fetching: false,
    error: false
};

export default function profileReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(state, action, {
        ...restAPIReducer({
            actionKey: 'GET_PROFILE',
            startKey: 'fetching',
            successKey: 'profile',
            errorKey: 'error',
            spreadPayload: true
        })
    });
}
