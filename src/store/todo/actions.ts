import { Dispatch } from 'redux'
import { TodoActionType, TodoActions } from './types'


export const addTodoListItem = (listId: string, label: string): TodoActions => {
    return {
        type: TodoActionType.AddTodoListItem,
        data: {
            listId,
            label,
        },
    }
}

export const setTodoItemDone = (listId: string, itemId: string): TodoActions => {
    return {
        type: TodoActionType.SetTodoItemDone,
        data: {
            listId,
            itemId,
        }
    }
}

export const setTodoItemPending = (listId: string, itemId: string): TodoActions => {
    return {
        type: TodoActionType.SetTodoItemPending,
        data: {
            listId,
            itemId,
        }
    }
}