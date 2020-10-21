import React, { useState, useCallback, useContext } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { AppState } from '../../../store';
import {
    editTodoList,
    createTodoListItem,
    editTodoListItem,
    setItemSortingMode,
} from '../../../store/todo/actions';
import { ItemSortingMode } from '../../../store/todo/types';
import SocketContext from '../../../sockets';

import TodoItem from './TodoItem';
import Editable from '../../inputs/Editable';
import NewItem from './NewItem';
import SortingToggle from './SortingToggle';

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
    position: relative;
    
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

    const { 
        lists, 
        activeListIdx,
    } = props;

    let {
        id: listId,
        title: listTitle, 
        items: listItems,
        sortingMode,
     } = lists[activeListIdx];
    if (sortingMode !== ItemSortingMode.All) {
        // If showing only pending or done, filter the rest out
        const sortingMask = sortingMode === ItemSortingMode.Pending ? false : true;
        listItems = listItems.filter(item => item.isDone === sortingMask);

    } else {
        // If showing all, sort to show pending first
        listItems = listItems.sort((a, b) => {
            if (a.isDone && !b.isDone) { return 1; }
            if (!a.isDone && b.isDone) { return -1; }
            else { return 0; }
        })
    }
    const hasItems = listItems.length > 0;

    const { 
        editTodoList,
        createTodoListItem,
        editTodoListItem,
        setItemSortingMode,
    } = props.actions; 

    const handleTitleEdit = (newTitle: string) => {
        console.log(newTitle);
        editTodoList(socket, listId, { title: newTitle });
    }

    const handleNewItem = (itemLabel: string) => {
        createTodoListItem(socket, listId, itemLabel);

        if (sortingMode === ItemSortingMode.Done) {
            // Reset sorting mode so the new item is actually visible to the user
            setItemSortingMode(listId, ItemSortingMode.All);
        }
    }

    return (
        <TodoListContainer>

            <SortingToggle onSelect={sortingMode => { setItemSortingMode(listId, sortingMode); }} />

            <Editable 
                textComponent={ListHeading}
                placeholder={"New ToDo List"}
                onEdit={handleTitleEdit}
            >{listTitle}</Editable>

            {hasItems && (<ItemsList>
                {listItems.map(item => (
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
        editTodoListItem,
        setItemSortingMode,
    }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);