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
        {
            id: 'testlist',
            title: 'Shopping list',
            items: [
                {
                    id: 'first',
                    label: 'Milk',
                    isDone: false,
                },
                {
                    id: 'second',
                    label: 'Bread',
                    isDone: false,
                },
                {
                    id: 'third',
                    label: 'Pasta',
                    isDone: true,
                },
            ],
        }
    ],
}

export default (state = initialState, action: TodoActions): TodoState => {
    console.log(action);
    switch (action.type) {
        case TodoActionType.AddTodoListItem: {
            const { listId, label } = action.data;
            
            const lists = [...state.lists];
            const targetListIdx = lists.findIndex(list => list.id === listId);
            lists[targetListIdx].items.push({
                id: 'GENERATE NEW ID HERE',
                isDone: false,
                label,
            });

            console.log(lists);

            return {
                ...state,
                lists,
                // lastUpdated: new Date(),
            }
        }

        default: {
            return state;
        }
    }
}