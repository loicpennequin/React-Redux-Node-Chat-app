import { connect } from 'react-redux';
import Router from 'next/router';
import ContactList from 'components/contact/contactList';
import Header from './header';

import './style.scss';

const Layout = ({ authenticated, children }) => (
    <div styleName={authenticated ? 'layout--authenticated' : 'layout'}>
        <header styleName="header">
            <Header />
        </header>
        {authenticated && (
            <aside styleName="sidebar">
                <ContactList />
            </aside>
        )}
        <main>{children}</main>
    </div>
);

function mapState(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapState)(Layout);
