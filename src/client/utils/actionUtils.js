import { APIFetch } from 'utils';

export default {
    RestAPIAction: ({
        url,
        method = 'get',
        options = {},
        actionKey,
        req = undefined,
        successCallback
    }) => async (dispatch, getState) => {
        try {
            dispatch({ type: `${actionKey}_START` });
            const payload = await APIFetch[method](url, { ...options }, req);
            await payload;
            dispatch({
                type: `${actionKey}_SUCCESS`,
                payload: successCallback
                    ? await successCallback(dispatch, getState, payload)
                    : payload
            });
        } catch (error) {
            console.error(error);
            dispatch({ type: `${actionKey}_ERROR`, error });
        }
    }
};
