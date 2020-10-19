export enum TodoActionType {
    AddTodoListItem = "ADD_TODO_LIST_ITEM",
}

interface AddTodoListItemAction {
    type: TodoActionType.AddTodoListItem,
    data: {
        listId: string,
        label: string,
    }
}

export type TodoActions = AddTodoListItemAction;