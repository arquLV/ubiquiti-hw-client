type UserData = {
    username: string,
    color: string,

    currentlyEditing: {
        id: string,
        cursorPosition: number,
    } | null,
}

type UsersState = {
    activeUsers: UserData[],
}

const initialState: UsersState = {
    activeUsers: [],
}

export default (state = initialState, action: any): UsersState => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}