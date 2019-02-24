import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { register } from 'actions/registerActions';
import { Card, Button, FormControl } from 'components/ui';

import './style.scss';

const RegisterForm = ({ register, handleSubmit }) => {
    return (
        <Card rounded>
            <Card.Header className="bg-primary text-lg">Sign up !</Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(register)}>
                    <Field
                        name="username"
                        component={props => (
                            <FormControl {...props} label="Username" />
                        )}
                    />
                    <Field
                        name="password"
                        component={props => (
                            <FormControl
                                {...props}
                                type="password"
                                label="Password"
                            />
                        )}
                    />
                    <Field
                        name="email"
                        component={props => (
                            <FormControl
                                {...props}
                                type="email"
                                label="Email"
                            />
                        )}
                    />

                    <Button type="submit" color="primary" className="m-top-sm">
                        Submit
                    </Button>
                </form>
            </Card.Body>
        </Card>
    );
};

function mapDispatch(dispatch) {
    return {
        register: values => dispatch(register(values))
    };
}

export default reduxForm({ form: 'register' })(
    connect(
        null,
        mapDispatch
    )(RegisterForm)
);
