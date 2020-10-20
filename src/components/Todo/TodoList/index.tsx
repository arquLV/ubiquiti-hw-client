import React, { useState, useCallback, useContext } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { AppState } from '../../../store';
import {
    editTodoList,
    createTodoListItem,
    editTodoListItem
} from '../../../store/todo/actions';
import SocketContext from '../../../sockets';

import TodoItem from './TodoItem';
import Editable from '../../inputs/Editable';
import NewItem from './NewItem';

const focusAnimation = keyframes`
    from {
        position: absolute;
        transform: translate3d(0, 0, 0);
    }

    to {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
`;

const TodoListContainer = styled.div`
    
    
    /* animation: ${focusAnimation} 1s;
    animation-fill-mode: both; */

    background: ${props => props.theme.colors.white};
    /* width: 500px; */

    width: 400px;
    min-height: 400px;
    box-sizing: border-box;

    border-radius: 8px;
    padding: 32px 24px;

    margin: 32px 0 0 32px;

    transition: 150ms all ease-out;
`;

const ListHeading = styled.h3`
    min-height: 34px;
    margin-bottom: 24px;

    font-size: 24px;
    line-height: 34px; 
    font-weight: bold;

    padding-bottom: 8px;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;

const ItemsList = styled.ul`
    padding: 0 0 24px 24px;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
`;


type TodoListProps = {} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoList: React.FC<TodoListProps> = props => {
    console.log(props);

    const { socket } = useContext(SocketContext);
    console.log(socket.connected);

    const todoList = props.lists[props.activeListIdx];
    const hasItems = todoList.items.length > 0;

    const { id: listId } = todoList;
    const { 
        editTodoList,
        createTodoListItem,
        editTodoListItem
    } = props.actions; 

    const handleTitleEdit = (newTitle: string) => {
        console.log(newTitle);
        editTodoList(socket, listId, { title: newTitle });
    }

    const handleNewItem = useCallback((itemLabel: string) => {
        createTodoListItem(socket, listId, itemLabel);
    }, [createTodoListItem, listId]);

    return (
        <TodoListContainer>
            <Editable 
                textComponent={ListHeading}
                placeholder={"New ToDo List"}
                onEdit={handleTitleEdit}
            >{todoList.title}</Editable>

            {hasItems && (<ItemsList>
                {todoList.items.map(item => (
                    <TodoItem
                        key={item.id}
                        isDone={item.isDone}

                        onCheckboxClick={() => {
                            editTodoListItem(socket, listId, item.id, { isDone: !item.isDone });
                        }}

                        onLabelEdit={newLabel => {
                            editTodoListItem(socket, listId, item.id, { label: newLabel });
                        }}
                    >{item.label}</TodoItem>
                ))}
            </ItemsList>)}
            <NewItem 
                onSubmit={handleNewItem}
            />
        </TodoListContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    ...state.todo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        editTodoList,
        createTodoListItem,
        editTodoListItem
    }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);