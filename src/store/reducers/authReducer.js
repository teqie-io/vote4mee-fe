import {handleActions} from 'redux-actions';
import axios from 'axios';
import asyncAction from '../asyncAction';

export const me = asyncAction('AUTH/ME', async ({ walletId }) => axios.get(`http://localhost:9090/employees/employee/wallet?wallet=${walletId}`));

const initialState = {
    loading: true,
    error: false,
    response: null,
    auth: null
};

export default handleActions(
    {
        [me.START]: (state) => state,
        [me.SUCCESS]: (state, action) => ({
            loading: false,
            error: false,
            response: null,
            auth: {
                ...state.auth,
                name: action?.payload?.name,
                roleId: action?.payload?.roleId,
                photoURL: `/static/mock-images/avatars/avatar_${action?.payload?.id}.jpg`,
                contributions: action?.payload?.contributions,
                projects: action?.payload?.projects
            }
        }),
        [me.FAILURE]: (state, error) => ({
                loading: false,
                error: true,
                response: error,
                auth: null
            }),
    },
    initialState
);