export type UserData = {
    username: string,
    color: string,

    currentlyEditing?: {
        id: string[], // e.g. [listId, itemId]
        cursorStart: number,
        cursorEnd: number,
    } | null,
}

export type UserCursorUpdate = {
    username: string,
    id: string[],
    start?: number,
    end?: number,
}

export enum UserAuthStatus {
    Authenticated = "AUTHENTICATED",
    NonAuthenticated = "NON_AUTHENTICATED",
    Authentifying = "AUTHENTIFYING",
    Unknown = "UNKNOWN",
}

export enum UserActionType {
    SetAuthenticated = "SET_AUTHENTICATED",
    SetNonAuthenticated = "SET_NONAUTHENTICATED",
    SetAuthentifying = "SET_AUTHENTIFYING",

    PopulateUsers = "POPULATE_USERS",
    AddOtherUser = "ADD_OTHER_USER",
    RemoveOtherUser = "REMOVE_OTHER_USER",
    UpdateUserEditingStatus = "UPDATE_USER_EDITING_STATUS",
}

interface SetAuthenticatedAction {
    type: UserActionType.SetAuthenticated,
    data: {
        username: string,
        color: string,
    }
}
interface SetAuthentifyingAction {
    type: UserActionType.SetAuthentifying,
}

interface SetNonAuthenticatedAction {
    type: UserActionType.SetNonAuthenticated,
}

interface PopulateUsersAction {
    type: UserActionType.PopulateUsers,
    data: {
        users: {
            username: string,
            color: string,
        }[]
    }
}

interface AddOtherUserAction {
    type: UserActionType.AddOtherUser,
    data: {
        username: string,
        color: string,
    }
}

interface RemoveOtherUserAction {
    type: UserActionType.RemoveOtherUser,
    data: {
        username: string,
    }
}

interface UpdateUserEditingStatusAction {
    type: UserActionType.UpdateUserEditingStatus,
    data: {
        username: string,
        id: string[],
        start?: number,
        end?: number,
    }
}


export type UserActions = SetAuthenticatedAction | SetAuthentifyingAction | 
    SetNonAuthenticatedAction | PopulateUsersAction | AddOtherUserAction | 
    RemoveOtherUserAction | UpdateUserEditingStatusAction;
