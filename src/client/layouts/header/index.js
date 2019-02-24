import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import { logout } from 'actions/authActions.js';
import { Flex } from 'components/ui';

import './style.scss';

const Header = ({ authenticated, logout }) => {
    const onLogout = e => {
        e.preventDefault();
        logout();
    };

    return (
        <div styleName="header">
            <Flex
                className={`bg-black p-sm text-white height100`}
                alignItems="center"
            >
                <nav styleName="nav">
                    {authenticated ? (
                        <>
                            <a onClick={onLogout} href="/" styleName="nav_link">
                                Log Out
                            </a>
                            <Link href="/dashboard">
                                <a styleName="nav_link">Dashboard</a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <a styleName="nav_link">Home</a>
                            </Link>
                            <Link href="/login">
                                <a styleName="nav_link">Login</a>
                            </Link>
                        </>
                    )}
                </nav>
            </Flex>
        </div>
    );
};

function mapState(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

function mapDispatch(dispatch) {
    return {
        logout: values => dispatch(logout())
    };
}

export default connect(
    mapState,
    mapDispatch
)(Header);
