import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { sendMessage } from 'actions/messageActions';

const MessageForm = ({ handleSubmit, reset, sendMessage, conversationId }) => {
    const onSendMessage = values => {
        sendMessage(values, conversationId);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSendMessage)}>
            <Field name="body" component="input" type="text" />
            <button type="submit">Send</button>
        </form>
    );
};

function mapDispatch(dispatch) {
    return {
        sendMessage: (...args) => dispatch(sendMessage(...args))
    };
}

export default reduxForm({ form: 'message' })(
    connect(
        null,
        mapDispatch
    )(MessageForm)
);
