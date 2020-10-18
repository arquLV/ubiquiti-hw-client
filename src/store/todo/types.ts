export enum TodoActionType {
    AddTodoListItem = "ADD_TODO_LIST_ITEM",
}

interface AddTodoListItemAction {
    type: TodoActionType.AddTodoListItem,
}

export type TodoActions = AddTodoListItemAction;