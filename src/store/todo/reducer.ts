import { TodoActionType, TodoActions } from './types';

type TodoState = {
    activeListIdx: number,
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
    switch (action.type) {
        case TodoActionType.AddTodoListItem: {
            return {
                ...state,
            }
        }

        default: {
            return state;
        }
    }
}