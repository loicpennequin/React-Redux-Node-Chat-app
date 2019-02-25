import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { register } from 'actions/registerActions';
import { Card, Button, FormControl, Spinner, Flex } from 'components/ui';

import './style.scss';

const RegisterForm = ({ register, fetching, handleSubmit }) => {
    return (
        <Card rounded>
            <Card.Header className="bg-primary text-lg">Sign up !</Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(register)} disabled={fetching}>
                    <Field
                        name="username"
                        type="text"
                        label="Username"
                        disabled={fetching}
                        component={FormControl}
                    />
                    <Field
                        name="password"
                        type="password"
                        label="Password"
                        disabled={fetching}
                        component={FormControl}
                    />
                    <Field
                        name="email"
                        type="email"
                        label="E-mail"
                        disabled={fetching}
                        component={FormControl}
                    />

                    <Flex alignItems="center" className="m-top-sm">
                        <Button type="submit" color="primary" disabled={fetching}>
                            Submit
                        </Button>
                        {fetching && <Spinner />}
                    </Flex>
                </form>
            </Card.Body>
        </Card>
    );
};

function mapstate(state){
    return {
        fetching: state.register.registering
    }
}

function mapDispatch(dispatch) {
    return {
        register: values => dispatch(register(values))
    };
}

export default reduxForm({ form: 'register' })(
    connect(
        mapstate,
        mapDispatch
    )(RegisterForm)
);
