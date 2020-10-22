import { Dispatch } from 'redux';
import axios from 'axios';

import { 
    UserActions, 
    UserActionType, 
    UserCursorUpdate, 
    UserData,
} from './types';

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

const populateUsers = (users: UserData[]): UserActions => {
    return {
        type: UserActionType.PopulateUsers,
        data: {
            users,
        }
    }
}

export const addOtherUser = (username: string, color: string): UserActions => {
    return {
        type: UserActionType.AddOtherUser,
        data: {
            username,
            color,
        }
    }
}

export const removeOtherUser = (username: string): UserActions => {
    return {
        type: UserActionType.RemoveOtherUser,
        data: {
            username,
        }
    }
}

export const updateUserEditingStatus = (update: UserCursorUpdate): UserActions => {
    return {
        type: UserActionType.UpdateUserEditingStatus,
        data: {
            username: update.username,
            id: update.id,
            start: update.start,
            end: update.end,
        }
    }
}

/*********************************************************/

export const fetchOtherUsers = () => (dispatch: Dispatch) => {
    axios.get<{ users: UserData[]}>(`${process.env.REACT_APP_API_URL}/users`, {
        withCredentials: true,
    }).then(res => {
        const { users } = res.data;
        dispatch(populateUsers(users));

    }).catch(err => {
        console.error(err);
    });
}


export const signupUser = (username: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAuthentifying());

    axios.post<UserData>(`${process.env.REACT_APP_API_URL}/signup`, {
        username,
        password,
    }, {
        withCredentials: true,
    }).then(res => {
        const { username, color } = res.data;
        dispatch(setStatusAuthenticated(username, color));
       
    }).catch(err => {
        console.error(err.response);
        if (err.response.status === 409) {
            window.alert('Username taken!');
        }
        dispatch(setStatusNonAuthenticated());
    });
}

type CheckAuthResponseData = {
    user?: UserData,
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

export const logIn = (username: string, password: string) => (dispatch: Dispatch) => {
    axios.post<UserData>(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
    }, {
        withCredentials: true,
    }).then(res => {
            const { username, color } = res.data;
            if (username && color) {
                dispatch(setStatusAuthenticated(username, color));
            } else {
                dispatch(setStatusNonAuthenticated());
            }
    }).catch(err => {
        console.error(err.response);
        if (err.response.status === 401) {
            window.alert('Invalid username or password!');
        }
    });
}

export const logOut = (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
        withCredentials: true,
    }).then(res => {
            socket.disconnect();
            dispatch(setStatusNonAuthenticated());
    }).catch(err => {
        console.error(err);
    });
}