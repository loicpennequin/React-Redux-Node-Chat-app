import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from 'actions/profileActions.js';
import { sendRequest } from 'actions/requestActions.js';

const ProfilePage = ({
    profile,
    isOwnProfile,
    isContact,
    sendRequest,
    requests
}) => {
    const canRequest =
        !Object.values(requests).some(
            r => r.sendee_id === profile.id || r.sender_id === profile.id
        ) &&
        !isOwnProfile &&
        !isContact;

    return (
        <>
            <h1 className="text-lg">
                This is the profile of {profile.username}
            </h1>
            <p>This is {isOwnProfile ? '' : 'not'} your profile</p>
            <p>
                {profile.username} is {isContact ? '' : 'not'} in your contact
                list
            </p>
            {canRequest && (
                <button onClick={() => sendRequest(profile.id)}>
                    Send Request
                </button>
            )}
        </>
    );
};
ProfilePage.authLevel = 'private';

ProfilePage.getInitialProps = async ctx => {
    await ctx.store.dispatch(getProfile(ctx.query.slug, ctx.req));
    return {};
};

function mapState(state) {
    return {
        isOwnProfile: state.profile.isOwnProfile,
        isContact: state.profile.isContact,
        profile: state.profile.profile,
        requests: state.request.requests
    };
}

function mapDispatch(dispatch) {
    return {
        sendRequest: sendee_id => dispatch(sendRequest({ sendee_id }))
    };
}

export default connect(
    mapState,
    mapDispatch
)(ProfilePage);
