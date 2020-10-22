import React, { useContext } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { AppState } from '../../../store';
import {
    editTodoList,
    deleteTodoList,
    createTodoListItem,
    editTodoListItem,
    setItemSortingMode,
} from '../../../store/todo/actions';
import { ItemSortingMode, TodoListData } from '../../../store/todo/types';
import SocketContext from '../../../sockets';

import TodoItem from './TodoItem';
import Editable from '../../inputs/Editable';
import NewItem from './NewItem';
import SortingToggle from './SortingToggle';

import { ReactComponent as TrashIcon } from '../../../icons/trash.svg';


const TodoListContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
   
    background: ${props => props.theme.colors.white};
    
    min-width: 100px;
    width: 400px;
    min-height: 400px;
    max-height: 600px;

    box-sizing: border-box;

    border-radius: 8px;
    padding: 32px 24px;

    margin: 32px 0 0 32px;

    transition: 150ms all ease-out;

    @media screen and (max-width: 768px) {
        margin: 24px 0;
        width: 90%;
    }
`;

const ListHeading = styled.h3`
    position: relative;
    min-height: 34px;
    margin-bottom: 24px;

    font-size: 24px;
    line-height: 34px; 
    font-weight: bold;

    padding-bottom: 8px;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
    
    /* flex: 1 0 auto; */
    flex-basis: auto;
`;

const ItemsList = styled.ul`
    padding: 0 0 24px 24px;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};

    min-height: 24px;
    flex-shrink: 1;

    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const DeleteButton = styled(TrashIcon)`
    position: absolute;
    top: 8px;
    right: 20px;

    height: 25px;
    width: 20px;

    cursor: pointer;
    transition: 100ms all ease-out;

    fill: ${props => props.theme.colors.darkGrey};
    opacity: 0.3;

    &:hover {
        opacity: 1;
    }
`;


type TodoListProps = TodoListData & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoList: React.FC<TodoListProps> = props => {

    const { socket } = useContext(SocketContext);

    const { 
        id: listId,
        title: listTitle,
        sortingMode,
        otherUsers,
    } = props;

    let { items: listItems } = props;

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
        deleteTodoList,
        createTodoListItem,
        editTodoListItem,
        setItemSortingMode,
    } = props.actions; 

    const handleTitleEdit = (newTitle: string) => {
        editTodoList(socket, listId, { title: newTitle });
    }
    const handleListDelete = () => {
        deleteTodoList(socket, listId);
    }

    const handleTitleCursorChange = (start: number, end: number) => {
        socket.emit('user-cursor', {
            id: [listId],
            start,
            end,
        });
    }
    const handleStopEditing = () => {
        socket.emit('user-cursor', {
            id: [],
        });
    }

    const handleNewItem = (itemLabel: string) => {
        createTodoListItem(socket, listId, itemLabel);

        if (sortingMode === ItemSortingMode.Done) {
            // Reset sorting mode so the new item is actually visible to the user
            setItemSortingMode(listId, ItemSortingMode.All);
        }
    }

    // Currently shows only one user editing each element
    // could redesign, so that Editable takes an array of them and shows all.
    // Hope it delivers the point.
    const listEditors = otherUsers.filter(user => user.currentlyEditing && user.currentlyEditing.id[0] === listId);
    const titleEditor = listEditors.find(user => user.currentlyEditing && user.currentlyEditing.id.length === 1);
    const itemEditors = listEditors.filter(user => user.currentlyEditing && user.currentlyEditing.id.length === 2);

    return (
        <TodoListContainer>

            <SortingToggle onSelect={sortingMode => { setItemSortingMode(listId, sortingMode); }} />
            <DeleteButton onClick={handleListDelete} />

            <Editable 
                textComponent={ListHeading}
                placeholder={"New ToDo List"}

                onEdit={handleTitleEdit}
                onStopEditing={handleStopEditing}
                onCursorChange={handleTitleCursorChange}

                showUserEditing={titleEditor && titleEditor.currentlyEditing ? {
                    color: titleEditor.color,
                    cursorStart: titleEditor.currentlyEditing.cursorStart,
                    cursorEnd: titleEditor.currentlyEditing.cursorEnd,
                } : undefined}
            >{listTitle}</Editable>

            {hasItems && (<ItemsList>
                {listItems.map(item => {
                    const itemEditor = itemEditors.find(user => user.currentlyEditing && user.currentlyEditing.id[1] === item.id)
                    return (
                        <TodoItem
                            key={item.id}
                            isDone={item.isDone}
    
                            otherUserEditing={itemEditor && itemEditor.currentlyEditing ? ({
                                color: itemEditor.color,
                                cursorStart: itemEditor.currentlyEditing.cursorStart,
                                cursorEnd: itemEditor.currentlyEditing.cursorEnd,
                            }) : undefined}
    
                            onCheckboxClick={() => {
                                editTodoListItem(socket, listId, item.id, { isDone: !item.isDone });
                            }}
    
                            onLabelEdit={newLabel => {
                                editTodoListItem(socket, listId, item.id, { label: newLabel });
                            }}

                            onLabelStopEditing={handleStopEditing}

                            onLabelCursorChange={(start, end) => {
                                socket.emit('user-cursor', {
                                    id: [listId, item.id],
                                    start,
                                    end,
                                });
                            }}
                        >{item.label}</TodoItem>
                    );
                })}
            </ItemsList>)}
            <NewItem 
                onSubmit={handleNewItem}
            />
        </TodoListContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    otherUsers: state.users.otherUsers,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        editTodoList,
        deleteTodoList,
        createTodoListItem,
        editTodoListItem,
        setItemSortingMode,
    }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);