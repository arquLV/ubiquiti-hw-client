import React, { useState, useCallback } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../store';
import { addTodoListItem } from '../../store/todo/actions';

import Checkbox from '../inputs/Checkbox';

const TodoListContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #fff;
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

const TodoItem: React.FC = props => {
    return (
        <li>{props.children}</li>
    );
}

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
    const { addTodoListItem } = props.actions; 

    const handleNewItem = useCallback((itemLabel: string) => {
        addTodoListItem(listId, itemLabel);
    }, [addTodoListItem, listId]);

    return (
        <TodoListContainer>
            <ListHeading>{todoList.title}</ListHeading>

            <ItemsList>
                <TodoItem>
                    {todoList.items.map(item => (
                        <Checkbox 
                            key={item.id}
                            name={item.id}
                            checked={item.isDone}
                        >{item.label}</Checkbox>
                    ))}
                </TodoItem>

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
    actions: bindActionCreators({ addTodoListItem }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);