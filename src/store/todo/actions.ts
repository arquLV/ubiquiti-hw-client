import axios from 'axios';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';

import { TodoActionType, TodoActions, TodoListData } from './types';

export const fetchTodoLists = () => (dispatch: Dispatch) => {
    axios.get<{ lists: TodoListData[]}>(`${process.env.REACT_APP_API_URL}/todos`, {
        withCredentials: true,
    }).then(res => {
        const { lists } = res.data;
        dispatch(populateTodoLists(lists));

    }).catch(err => {
        console.error(err);
    });
}

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

const populateTodoLists = (lists: TodoListData[]): TodoActions => {
    return {
        type: TodoActionType.PopulateTodoLists,
        data: {
            lists,
        }
    }
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

// type TodoListData = {
//     title: string,
// }
export const editTodoList = (socket: SocketIOClient.Socket, listId: string, data: { title: string }) => (dispatch: Dispatch) => {
    console.log(listId);
    socket.emit('todo/update', {
        listId,
        data,
    });

    dispatch(updateTodoList(listId, data.title));
}

export const addTodoListItem = (listId: string, itemId: string, label: string): TodoActions => {
    return {
        type: TodoActionType.AddTodoListItem,
        data: {
            listId,
            itemId,
            label,
        },
    }
}

export const createTodoListItem = (socket: SocketIOClient.Socket, listId: string, label: string) => (dispatch: Dispatch) => {
    const itemTempId = uuid();

    socket.emit('todo/addItem', {
        listId,
        data: {
            tempId: itemTempId,
            label,
        }
    });
    dispatch(addTodoListItem(listId, itemTempId, label));
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

type TodoItemData = {
    label?: string,
    isDone?: boolean,
}

export const updateTodoListItem = (listId: string, itemId: string, label?: string, isDone?: boolean): TodoActions => {
    return {
        type: TodoActionType.UpdateTodoListItem,
        data: {
            listId,
            itemId,
            label,
            isDone,
        }
    }
}

export const editTodoListItem = (socket: SocketIOClient.Socket, listId: string, itemId: string, data: TodoItemData) => (dispatch: Dispatch) => {
    socket.emit('todo/editItem', {
        listId,
        itemId,
        data,
    });
    dispatch(updateTodoListItem(listId, itemId, data.label, data.isDone));
}