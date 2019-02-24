import { APIFetch } from 'utils';
import { actionUtils } from 'utils';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_REGISTER_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_REGISTER_ERROR = 'GET_PROFILE_ERROR';

export const getProfile = (slug, req) =>
    actionUtils.RestAPIAction({
        url: `/user/${slug}`,
        method: 'get',
        actionKey: 'GET_PROFILE',
        successCallback: (dispatch, getState, payload) => {
            const requests = getState().request.requests;
            const user = getState().user.user;

            const isOwnProfile = payload.id === user.id;
            return {
                profile: payload,
                isOwnProfile,
                isContact: user.contactIds.some(id => id === payload.id)
            };
        },
        req
    });
