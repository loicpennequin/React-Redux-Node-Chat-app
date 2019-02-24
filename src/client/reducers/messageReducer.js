import { reducerUtils } from 'utils';
import {
    ADD_MESSAGES,
    ADD_MESSAGE_ID,
    MARK_MESSAGES_AS_READ_SUCCESS
} from 'actions/messageActions.js';

const initialState = {
    conversations: {},
    messages: {},
    fetching: false,
    fetchError: false,
    sending: false,
    sendError: false
};

export default function messageReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(state, action, {
        ...restAPIReducer({
            actionKey: 'GET_CONVERSATION',
            successKey: 'conversations',
            usePayload: true
        }),
        ...restAPIReducer({
            actionKey: 'SEND_MESSAGE',
            startKey: 'sending',
            successKey: 'messages',
            errorKey: 'sendError',
            usePayload: true
        }),
        ADD_MESSAGES: (state, action) => {
            return {
                ...state,
                messages: { ...state.messages, ...action.payload }
            };
        },
        ADD_MESSAGE_ID: (
            state,
            { type, payload: { messageId, conversationId } }
        ) => {
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    [conversationId]: [
                        ...state.conversations[conversationId],
                        messageId
                    ]
                }
            };
        },
        MARK_MESSAGES_AS_READ_SUCCESS: (
            state,
            { type, payload: { messageIds } }
        ) => {
            const updatedMessages = messageIds.reduce(
                (acc, id) => ({
                    ...acc,
                    [id]: { ...state.messages[id], is_read: 1 }
                }),
                {}
            );
            return {
                ...state,
                messages: { ...state.messages, ...updatedMessages }
            };
        }
    });
}
