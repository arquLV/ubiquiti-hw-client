export enum TodoActionType {
    AddTodoList = "ADD_TODO_LIST",
    AddTodoListItem = "ADD_TODO_LIST_ITEM",
    SetTodoItemDone = "SET_TODO_ITEM_DONE",
    SetTodoItemPending = "SET_TODO_ITEM_PENDING",
}

interface AddTodoListAction {
    type: TodoActionType.AddTodoList,
}

interface AddTodoListItemAction {
    type: TodoActionType.AddTodoListItem,
    data: {
        listId: string,
        label: string,
    }
}

interface SetTodoItemDoneAction {
    type: TodoActionType.SetTodoItemDone,
    data: {
        listId: string,
        itemId: string,
    }
}

interface SetTodoItemPendingAction {
    type: TodoActionType.SetTodoItemPending,
    data: {
        listId: string,
        itemId: string,
    }
}

export type TodoActions = AddTodoListAction | AddTodoListItemAction | 
    SetTodoItemDoneAction | SetTodoItemPendingAction;