import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

const ContactList = ({ contacts, user, conversations, messages }) => {
    const userStatusMapping = {
        0: 'red',
        1: 'lime',
        2: 'orange'
    };
    return (
        <>
            <h2 className="text-md">Contact List</h2>
            <ul>
                {user.contactIds.map(id => {
                    return (
                        <li key={id}>
                            <Link
                                as={`/conversation/${contacts[id].slug}`}
                                href={`/conversation?slug=${contacts[id].slug}`}
                            >
                                <a style={{ display: 'flex' }}>
                                    <div
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor:
                                                userStatusMapping[
                                                    contacts[id].status
                                                ]
                                        }}
                                    />
                                    {contacts[id].username} -
                                    {contacts[id].unreadMessagesCount} new
                                    messages
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

function mapState(state) {
    return {
        contacts: state.contact.contacts,
        user: state.user.user
    };
}

function mapDispatch(state) {
    return {};
}

export default connect(
    mapState,
    mapDispatch
)(ContactList);
