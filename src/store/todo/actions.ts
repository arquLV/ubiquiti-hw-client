import { Dispatch } from 'redux'
import { TodoActionType, TodoActions } from './types'

/**
 * Adds a new Todo list to the store locally
 * given known `listId` (e.g. received from server)
 * @param listId 
 */
export const addTodoList = (listId: string): TodoActions => {
    return {
        type: TodoActionType.AddTodoList,
        data: {
            listId,
        }
    }
}

/**
 * Requests the server to create a new todo list via the provided `socket`
 * @param socket 
 */
export const requestNewTodoList = (socket: SocketIOClient.Socket) => (dispatch: Dispatch) => {
    // dispatch(addTodoList());
    socket.emit('todo/create', {});
}

export const updateTodoList = (listId: string, title: string): TodoActions => {
    return {
        type: TodoActionType.UpdateTodoList,
        data: {
            listId,
            title,
        }
    }
}

type TodoListData = {
    title: string,
}
export const editTodoList = (socket: SocketIOClient.Socket, listId: string, data: TodoListData) => (dispatch: Dispatch) => {
    console.log(listId);
    socket.emit('todo/update', {
        listId,
        data,
    });

    dispatch(updateTodoList(listId, data.title));
}

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

