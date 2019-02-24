import { reducerUtils } from 'utils';
import { MARK_MESSAGES_AS_READ_SUCCESS } from 'actions/messageActions.js';

const initialState = {
    contacts: {}
};

export default function contactReducer(state = initialState, action) {
    const { resolveReducer, restAPIReducer } = reducerUtils;

    return resolveReducer(state, action, {
        SET_CONTACTS: (state, action) => ({
            ...state,
            contacts: action.payload
        }),
        ADD_CONTACT: (state, action) => ({
            ...state,
            contacts: { ...state.contacts, [action.payload.id]: action.payload }
        }),
        CONTACT_LOGGED_IN: (state, action) => ({
            ...state,
            contacts: {
                ...state.contacts,
                [action.payload]: {
                    ...state.contacts[action.payload],
                    status: 1
                }
            }
        }),
        CONTACT_LOGGED_OUT: (state, action) => ({
            ...state,
            contacts: {
                ...state.contacts,
                [action.payload]: {
                    ...state.contacts[action.payload],
                    status: 0
                }
            }
        }),
        MARK_MESSAGES_AS_READ_SUCCESS: (
            state,
            { type, payload: { contactId } }
        ) => ({
            ...state,
            contacts: {
                ...state.contacts,
                [contactId]: {
                    ...state.contacts[contactId],
                    unreadMessagesCount: 0
                }
            }
        }),
        NEW_UNREAD_MESSAGE: (state, { type, payload }) => ({
            ...state,
            contacts: {
                ...state.contacts,
                [payload]: {
                    ...state.contacts[payload],
                    unreadMessagesCount:
                        state.contacts[payload].unreadMessagesCount + 1
                }
            }
        })
    });
}
