const reducerUtils = {
    restAPIReducer: ({
        actionKey,
        startKey = 'fetching',
        successKey = 'fetched',
        errorKey = 'fetchError',
        usePayload = false,
        spreadPayload = false
    }) => ({
        [`${actionKey}_START`]: (state, { type, payload, error }) => ({
            ...state,
            [startKey]: true,
            [errorKey]: false
        }),
        [`${actionKey}_SUCCESS`]: (state, { type, payload, error }) => ({
            ...state,
            [startKey]: false,
            ...(spreadPayload
                ? payload
                : { [successKey]: usePayload ? payload : true }),
            [errorKey]: false
        }),
        [`${actionKey}_ERROR`]: (state, { type, payload, error }) => ({
            ...state,
            [startKey]: false,
            [successKey]: false,
            [errorKey]: error ? error : true
        })
    }),
    resolveReducer: (state, action, reducer) =>
        reducer[action.type] ? reducer[action.type](state, action) : state
};

export default reducerUtils;
