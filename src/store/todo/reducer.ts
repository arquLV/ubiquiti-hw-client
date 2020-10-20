import { TodoActionType, TodoActions, TodoListData } from './types';

type TodoState = {
    activeListIdx: number,
    // lastUpdated: Date,

    loaded: boolean,
    lists: TodoListData[],
}

const initialState: TodoState = {
    activeListIdx: 0,
    loaded: false,
    // lastUpdated: new Date(),
    lists: [
        // {
        //     id: 'testlist',
        //     title: 'Shopping list',
        //     items: [
        //         {
        //             id: 'first',
        //             label: 'Milk',
        //             isDone: false,
        //         },
        //         {
        //             id: 'second',
        //             label: 'Bread',
        //             isDone: false,
        //         },
        //         {
        //             id: 'third',
        //             label: 'Pasta',
        //             isDone: true,
        //         },
        //     ],
        // }
    ],
}

export default (state = initialState, action: TodoActions): TodoState => {
    console.log(action);
    switch (action.type) {

        case TodoActionType.AddTodoList: {
            const { data: { listId }} = action;

            const lists = [...state.lists];
            const newListsLength = lists.push({
                id: listId,
                title: 'New ToDo List',
                items: [],
            });

            return {
                ...state,
                activeListIdx: newListsLength - 1,
                lists,
            }
        }

        case TodoActionType.PopulateTodoLists: {
            const { data: { lists }} = action;

            return {
                ...state,
                lists,
                loaded: true,
            }
        }

        case TodoActionType.UpdateTodoList: {
            const { listId, title } = action.data;
            
            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);

            lists[targetListIdx].title = title;

            return {
                ...state,
                lists
            }
        }

        case TodoActionType.AddTodoListItem: {
            const { listId, itemId, label } = action.data;
            
            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            lists[targetListIdx].items.push({
                id: itemId,
                isDone: false,
                label,
            });

            return {
                ...state,
                lists,
                // lastUpdated: new Date(),
            }
        }

        case TodoActionType.UpdateTodoListItem: {
            const { listId, itemId, label, isDone } = action.data;

            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            const targetItemIdx = lists[targetListIdx].items.findIndex(item => item.id === itemId);

            const item = lists[targetListIdx].items[targetItemIdx];

            if (label !== undefined) {
                item.label = label;
            }
            if (isDone !== undefined) {
                item.isDone = isDone;
            }

            return {
                ...state,
                lists,
            }
        }

        case TodoActionType.SetTodoItemDone: {
            const { listId, itemId } = action.data;

            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            const targetItemIdx = lists[targetListIdx].items.findIndex(item => item.id === itemId);
        
            lists[targetListIdx].items[targetItemIdx].isDone = true;

            return {
                ...state,
                lists,
            }
        }

        case TodoActionType.SetTodoItemPending: {
            const { listId, itemId } = action.data;

            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            const targetItemIdx = lists[targetListIdx].items.findIndex(item => item.id === itemId);
        
            lists[targetListIdx].items[targetItemIdx].isDone = false;

            return {
                ...state,
                lists,
            }
        }

        default: {
            return state;
        }
    }
}