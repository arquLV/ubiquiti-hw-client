import { 
    UserActions, 
    UserActionType, 
    UserAuthStatus,
    UserData,
} from './types';

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

        case UserActionType.PopulateUsers: {
            const { users } = action.data;

            const otherUsers = users.reduce<UserData[]>((others, user) => {
                if (state.user && user.username === state.user.username) {
                    return others;
                }

                others.push({
                    username: user.username,
                    color: user.color,
                    currentlyEditing: null,
                });
                return others;
            }, []);
  
            return {
                ...state,
                otherUsers,
            }
        }

        case UserActionType.AddOtherUser: {
            const { username, color } = action.data;

            const otherUsers = [...state.otherUsers];
            if (otherUsers.find(user => user.username === username) !== undefined) {
                // Already exists. Shouldn't normally happen.
                return state;
            }

            otherUsers.push({
                username,
                color,
                currentlyEditing: null,
            });

            return {
                ...state,
                otherUsers,
            }
        }

        case UserActionType.RemoveOtherUser: {
            const { username } = action.data;

            const otherUsers = state.otherUsers.filter(user => user.username !== username);
            return {
                ...state,
                otherUsers,
            }
        }

        case UserActionType.UpdateUserEditingStatus: {
            const {
                username,
                id,
                start,
                end,
            } = action.data;

            const otherUsers = [...state.otherUsers];
            const user = otherUsers.find(user => user.username === username);
            if (!user) {
                return state;
            }

            if (id.length > 0 && start !== undefined && end !== undefined) {
                user.currentlyEditing = {
                    id,
                    cursorStart: start,
                    cursorEnd: end,
                }
            } else {
                user.currentlyEditing = null;
            }
            
            return {
                ...state,
                otherUsers,
            }
        }

        default: {
            return state;
        }
    }
}