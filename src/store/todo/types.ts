export type TodoListData = {
    id: string,
    title: string,
    items: {
        id: string,
        label: string,
        isDone: boolean,
    }[],
}

export enum TodoActionType {
    AddTodoList = "ADD_TODO_LIST",
    UpdateTodoList = "UPDATE_TODO_LIST",
    PopulateTodoLists = "POPULATE_TODO_LISTS",

    AddTodoListItem = "ADD_TODO_LIST_ITEM",
    UpdateTodoListItem = "UPDATE_TODO_LIST_ITEM",
    SetTodoItemDone = "SET_TODO_ITEM_DONE",
    SetTodoItemPending = "SET_TODO_ITEM_PENDING",
}

interface AddTodoListAction {
    type: TodoActionType.AddTodoList,
    data: {
        listId: string,
    }
}

interface PopulateTodoListsAction {
    type: TodoActionType.PopulateTodoLists,
    data: {
        lists: TodoListData[],
    }
}

interface UpdateTodoListAction {
    type: TodoActionType.UpdateTodoList,
    data: {
        listId: string,
        title: string,
    }
}

interface AddTodoListItemAction {
    type: TodoActionType.AddTodoListItem,
    data: {
        listId: string,
        itemId: string,
        label: string,
    }
}

interface UpdateTodoListItemAction {
    type: TodoActionType.UpdateTodoListItem,
    data: {
        listId: string,
        itemId: string,
        label?: string,
        isDone?: boolean,
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

export type TodoActions = AddTodoListAction | PopulateTodoListsAction | UpdateTodoListAction | AddTodoListItemAction | 
    UpdateTodoListItemAction | SetTodoItemDoneAction | SetTodoItemPendingAction;