import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Router from 'next/router';

import { login } from 'actions/authActions';

import { Card, Button } from 'components/ui';

const LoginForm = ({ login, handleSubmit }) => {
    const onLogin = async values => {
        await login(values, Router);
    };
    return (
        <Card>
            <Card.Body>
                <form onSubmit={handleSubmit(onLogin)}>
                    <label>Username</label>
                    <Field name="username" component="input" type="text" />
                    <label>Password</label>
                    <Field name="password" component="input" type="password" />
                    <Button type="submit" color="primary">
                        Login
                    </Button>
                </form>
            </Card.Body>
        </Card>
    );
};

function mapDispatch(dispatch) {
    return {
        login: (values, router) => dispatch(login(values, router))
    };
}

export default reduxForm({ form: 'login' })(
    connect(
        null,
        mapDispatch
    )(LoginForm)
);
