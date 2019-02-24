import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket, { createSocketConnexion } from 'utils/sockets.js';
import paths from 'constants/paths.js';
import io from 'socket.io-client';

import { onContactLogin, onContactLogout } from 'actions/contactActions';
import { onNewMessageRecieved } from 'actions/messageActions';

class WebsocketsContainer extends Component {
    state = {
        connected: false
    };

    componentDidMount() {
        this.openWebsocketsConnexion();
    }

    componentDidUpdate() {
        this.openWebsocketsConnexion();
    }

    componentWillUnmount() {
        this.closeWebsocketsConnection();
    }

    closeWebsocketsConnection() {
        // socket.close();
        // this.cancelSubscriptions();
    }

    openWebsocketsConnexion() {
        if (this.props.authenticated && !this.state.connected) {
            createSocketConnexion();

            socket().on('CONTACT LOGGED IN', ({ id }) => {
                this.props.onContactLogin(id);
            });

            socket().on('CONTACT LOGGED OUT', ({ id }) => {
                this.props.onContactLogout(id);
            });

            socket().on('Recieved new message', data => {
                this.props.onNewMessageRecieved(data);
            });
            this.setState({ connected: true });
        }
    }

    render() {
        return this.props.children;
    }
}

function mapState(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

function mapDispatch(dispatch) {
    return {
        onContactLogin: id => dispatch(onContactLogin(id)),
        onContactLogout: id => dispatch(onContactLogout(id)),
        onNewMessageRecieved: message => dispatch(onNewMessageRecieved(message))
    };
}

export default connect(
    mapState,
    mapDispatch
)(WebsocketsContainer);
