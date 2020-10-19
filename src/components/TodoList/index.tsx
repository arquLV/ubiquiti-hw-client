import React, { useState, useCallback } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../store';
import {
    addTodoListItem,
    setTodoItemDone,
    setTodoItemPending,
} from '../../store/todo/actions';

import Checkbox from '../inputs/Checkbox';
import TodoItem from './TodoItem';
import Editable from '../inputs/Editable';

const TodoListContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: ${props => props.theme.colors.white};
    width: 500px;

    border-radius: 8px;
    padding: 16px 12px 20px;
`;

const ListHeading = styled.h3`
    font-size: 24px;
    font-weight: bold;
`;

const ItemsList = styled.ul`

`;

type NewItemsProps = {
    onSubmit: (content: string) => void,
}
const NewItem: React.FC<NewItemsProps> = props => {

    const [content, setContent] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Tab"].includes(e.key)) {
            console.log(content);
            props.onSubmit(content);

            // Reset input field content to empty string
            setContent('');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    return (
        <li>
            <input 
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress} 
                value={content}
            />
        </li>
    );
}

type TodoListProps = {} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoList: React.FC<TodoListProps> = props => {
    console.log(props);

    const todoList = props.lists[props.activeListIdx];

    const { id: listId } = todoList;
    const { 
        addTodoListItem,
        setTodoItemDone,
        setTodoItemPending,
    } = props.actions; 

    const handleNewItem = useCallback((itemLabel: string) => {
        addTodoListItem(listId, itemLabel);
    }, [addTodoListItem, listId]);

    return (
        <TodoListContainer>
            <Editable textComponent={ListHeading}>{todoList.title}</Editable>

            <ItemsList>
                {todoList.items.map(item => (
                    <TodoItem
                        key={item.id}
                        isDone={item.isDone}
                        onCheckboxClick={() => {
                            if (item.isDone) {
                                setTodoItemPending(listId, item.id);
                            } else {
                                setTodoItemDone(listId, item.id);
                            }
                        }}
                    >{item.label}</TodoItem>
                ))}

                <NewItem 
                    onSubmit={handleNewItem}
                />
            </ItemsList>
        </TodoListContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    ...state.todo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        addTodoListItem,
        setTodoItemDone,
        setTodoItemPending,
    }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);