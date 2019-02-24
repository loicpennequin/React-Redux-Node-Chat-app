import { actionUtils, arrayToObject } from 'utils';

export const GET_CONVERSATION_START = 'GET_CONVERSATION_START';
export const GET_CONVERSATION_SUCCESS = 'GET_CONVERSATION_SUCCESS';
export const GET_CONVERSATION_ERROR = 'GET_CONVERSATION_ERROR';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const ADD_MESSAGE_ID = 'ADD_MESSAGE_ID';
export const MARK_MESSAGES_AS_READ_START = 'MARK_MESSAGES_AS_READ_START';
export const MARK_MESSAGES_AS_READ_SUCCESS = 'MARK_MESSAGES_AS_READ_SUCCESS';
export const MARK_MESSAGES_AS_READ_ERROR = 'MARK_MESSAGES_AS_READ_ERROR';
export const NEW_UNREAD_MESSAGE = 'NEW_UNREAD_MESSAGE';

export const getConversation = (id, req) =>
    actionUtils.RestAPIAction({
        url: `/message/conversation/${id}`,
        method: 'get',
        actionKey: 'GET_CONVERSATION',
        successCallback: (dispatch, getState, payload) => {
            const normalizedMessages = arrayToObject(payload);
            dispatch({ type: ADD_MESSAGES, payload: normalizedMessages });
            return { [id]: payload.map(m => m.id) };
        },
        req
    });

export const sendMessage = ({ body }, conversationId) => async (
    dispatch,
    getState
) => {
    const _body = {
        sendee_id: conversationId,
        body
    };
    let messageId;

    await actionUtils.RestAPIAction({
        url: '/message',
        method: 'post',
        options: {
            body: _body
        },
        actionKey: 'SEND_MESSAGE',
        successCallback: (dispatch, getState, payload) => {
            messageId = payload.id;
            return {
                ...getState().message.messages,
                [payload.id]: payload
            };
        }
    })(dispatch, getState);

    dispatch({
        type: ADD_MESSAGE_ID,
        payload: { messageId, conversationId }
    });
};

export const markMessagesAsRead = contactId =>
    actionUtils.RestAPIAction({
        url: `/contact/${contactId}/markasread`,
        method: 'put',
        actionKey: 'MARK_MESSAGES_AS_READ',
        successCallback: (dispatch, getState, messageIds) => {
            return {
                contactId,
                messageIds
            };
        }
    });

export const onNewMessageRecieved = message => (dispatch, setState) => {
    dispatch({
        type: ADD_MESSAGES,
        payload: arrayToObject([message])
    });

    dispatch({
        type: ADD_MESSAGE_ID,
        payload: { messageId: message.id, conversationId: message.sender_id }
    });

    dispatch({
        type: NEW_UNREAD_MESSAGE,
        payload: message.sender_id
    });
};
