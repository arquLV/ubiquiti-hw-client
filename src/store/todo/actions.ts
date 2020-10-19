import { Dispatch } from 'redux'
import { TodoActionType, TodoActions } from './types'


export const addTodoListItem = (listId: string, label: string): TodoActions => {
    console.log('ADDING NEW ITEM');
    return {
        type: TodoActionType.AddTodoListItem,
        data: {
            listId,
            label,
        },
    }
}