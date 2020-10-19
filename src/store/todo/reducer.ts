import { TodoActionType, TodoActions } from './types';

type TodoState = {
    activeListIdx: number,
    // lastUpdated: Date,
    lists: {
        id: string,
        title: string,
        items: {
            id: string,
            label: string,
            isDone: boolean,
        }[],
    }[],
}

const initialState: TodoState = {
    activeListIdx: 0,
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
            const lists = [...state.lists];
            const newListsLength = lists.push({
                id: 'newlist',
                title: 'New ToDo List',
                items: [],
            });

            return {
                ...state,
                activeListIdx: newListsLength - 1,
                lists,
            }
        }

        case TodoActionType.AddTodoListItem: {
            const { listId, label } = action.data;
            
            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            lists[targetListIdx].items.push({
                id: 'GENERATE NEW ID HERE',
                isDone: false,
                label,
            });

            return {
                ...state,
                lists,
                // lastUpdated: new Date(),
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