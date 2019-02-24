import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { getConversation, markMessagesAsRead } from 'actions/messageActions.js';
import { distanceInWordsToNow } from 'date-fns';

import MessageForm from 'components/forms/messageForm';
const ConversationPage = ({
    router,
    conversations,
    conversationId,
    messages,
    markMessagesAsRead
}) => {
    const conversation = conversations[conversationId];

    useEffect(
        () => {
            markMessagesAsRead(conversationId);
        },
        [conversation]
    );
    return (
        <>
            <div>This is your conversation with {router.query.slug}</div>;
            {conversation.map(messageId => {
                const message = messages[messageId];
                return (
                    <div key={messageId}>
                        <p>
                            <span style={{ fontWeight: 'bold' }}>
                                {message.sender.username}
                            </span>
                            <span>
                                {' '}
                                -
                                {distanceInWordsToNow(
                                    new Date(message.created_at)
                                )}{' '}
                                ago
                            </span>
                        </p>
                        <p key={messageId}>{message.body}</p>
                    </div>
                );
            })}
            <MessageForm conversationId={conversationId} />
        </>
    );
};
ConversationPage.authLevel = 'private';

ConversationPage.getInitialProps = async ctx => {
    const id = Object.values(ctx.store.getState().contact.contacts).find(
        c => c.slug === ctx.query.slug
    ).id;

    await ctx.store.dispatch(getConversation(id, ctx.req));
    return {
        conversationId: id
    };
};

function mapState(state) {
    return {
        conversations: state.message.conversations,
        messages: state.message.messages
    };
}

function mapDispatch(dispatch) {
    return { markMessagesAsRead: id => dispatch(markMessagesAsRead(id)) };
}

export default withRouter(
    connect(
        mapState,
        mapDispatch
    )(ConversationPage)
);
