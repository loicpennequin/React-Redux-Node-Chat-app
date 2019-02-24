import { LoginForm } from 'components/forms';
import { connect } from 'react-redux';

const LoginPage = ({ success, fetching, error }) => {
    return (
        <>
            <h1 className="text-lg">Log in to Daria Hub</h1>
            {!success && <LoginForm />}
            {fetching && <p>Logging you in...</p>}
            {error && <p>Sorry, we couldn't authenticate you. Try again ?</p>}
        </>
    );
};
LoginPage.authLevel = 'public';

function mapState(state) {
    return {
        fetching: state.auth.authenticating,
        error: state.auth.error
    };
}

export default connect(mapState)(LoginPage);
