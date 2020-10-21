import { 
    UserActions, 
    UserActionType, 
    UserAuthStatus,
} from './types';

type UserData = {
    username: string,
    color: string,

    currentlyEditing?: {
        id: string[], // e.g. [listId, itemId]
        cursorStart: number,
        cursorEnd: number,
    } | null,
}

type UsersState = {
    user: UserData | null,
    authStatus: UserAuthStatus,

    otherUsers: UserData[],
}

const initialState: UsersState = {
    user: null,
    authStatus: UserAuthStatus.Unknown,

    otherUsers: [{
        username: 'testyboi',
        color: '#f00',
        currentlyEditing: null,
    }],
}

export default (state = initialState, action: UserActions): UsersState => {
    switch (action.type) {

        case UserActionType.SetAuthentifying: {
            return {
                ...state,
                authStatus: UserAuthStatus.Authentifying,
            }
        }

        case UserActionType.SetNonAuthenticated: {
            return {
                ...state,
                authStatus: UserAuthStatus.NonAuthenticated,
            }
        }

        case UserActionType.SetAuthenticated: {
            const { username, color } = action.data;
            return {
                ...state,
                authStatus: UserAuthStatus.Authenticated,
                user: {
                    username,
                    color,
                }
            }
        }

        default: {
            return state;
        }
    }
}