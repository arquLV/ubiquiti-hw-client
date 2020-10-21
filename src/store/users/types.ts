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


export type UserActions = SetAuthenticatedAction | SetAuthentifyingAction | 
    SetNonAuthenticatedAction;
