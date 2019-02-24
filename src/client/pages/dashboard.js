import { LoginForm } from 'components/forms';
import { connect } from 'react-redux';
import Link from 'next/link';

import { getLatestUsers } from 'actions/userActions.js';
import { acceptRequest, declineRequest } from 'actions/requestActions.js';

const DashboardPage = ({
    user,
    latestUsers,
    requests,
    acceptRequest,
    declineRequest
}) => {
    const recievedRequests = user.requestIds.filter(
        id => requests[id] && requests[id].sender_id !== user.id
    );

    return (
        <>
            <h1 className="text-lg">
                Hello {user.username}, this is your dashboard
            </h1>
            <h2 className="text-md">The Latest members are :</h2>
            <ul>
                {latestUsers.length &&
                    latestUsers.map(u => (
                        <li key={u.id}>
                            <Link
                                as={`/profile/${u.slug}`}
                                href={`/profile?slug=${u.slug}`}
                            >
                                <a>{u.username}</a>
                            </Link>
                        </li>
                    ))}
            </ul>
            <br />
            <h2 className="text-md">New Contact requests</h2>
            {recievedRequests.length === 0 && <p>You have no new requests.</p>}
            <ul>
                {recievedRequests.map(id => (
                    <div key={id}>
                        {requests[id].sender.username}
                        <button onClick={() => acceptRequest(id)}>
                            Accept
                        </button>
                        <button onClick={() => declineRequest(id)}>
                            Decline
                        </button>
                    </div>
                ))}
            </ul>
        </>
    );
};
DashboardPage.authLevel = 'private';
DashboardPage.getInitialProps = async ctx => {
    await ctx.store.dispatch(getLatestUsers(ctx.req));
    //maybe return null instead ?
    return {};
};

function mapState(state) {
    return {
        user: state.user.user,
        latestUsers: state.user.latestUsers,
        requests: state.request.requests
    };
}

function mapDispatch(dispatch) {
    return {
        acceptRequest: id => dispatch(acceptRequest(id)),
        declineRequest: id => dispatch(declineRequest(id))
    };
}

export default connect(
    mapState,
    mapDispatch
)(DashboardPage);
