import { Dispatch } from 'redux';
import axios from 'axios';

import { UserActions, UserActionType } from './types';

const setStatusAuthentifying = (): UserActions => {
    return {
        type: UserActionType.SetAuthentifying,
    }
}

const setStatusAuthenticated = (username: string, color: string): UserActions => {
    return {
        type: UserActionType.SetAuthenticated,
        data: {
            username,
            color,
        }
    }
}

const setStatusNonAuthenticated = (): UserActions => {
    return {
        type: UserActionType.SetNonAuthenticated,
    }
}

type SignupResponseData = { username: string, color: string }
export const signupUser = (username: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAuthentifying());

    axios.post<SignupResponseData>(`${process.env.REACT_APP_API_URL}/signup`, {
        username,
        password,
    }, {
        withCredentials: true,
    }).then(res => {
        const { username, color } = res.data;
        dispatch(setStatusAuthenticated(username, color));
       
    }).catch(err => {
        console.error(err.response);
        dispatch(setStatusNonAuthenticated());
    });
}

type CheckAuthResponseData = {
    success: boolean,
    user: {
        username: string,
        color: string,
    }
}
export const checkAuth = () => (dispatch: Dispatch) => {
    dispatch(setStatusAuthentifying());

    axios.post<CheckAuthResponseData>(`${process.env.REACT_APP_API_URL}/checkAuth`, {}, {
        withCredentials: true,
    }).then(res => {
        const { user } = res.data;
        console.log(res.data);
        if (user) {
            dispatch(setStatusAuthenticated(user.username, user.color));
        } else {
            dispatch(setStatusNonAuthenticated());
        }
    }).catch(err => {
        console.error(err);
        dispatch(setStatusNonAuthenticated());
    });
}