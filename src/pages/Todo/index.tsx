import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { 
    fetchTodoLists,
    updateTodoList,
    removeTodoList,
    requestNewTodoList,
    addTodoList,
    addTodoListItem,
    updateTodoListItem,
} from '../../store/todo/actions';

import {
    addOtherUser,
    fetchOtherUsers,
    removeOtherUser,
    updateUserEditingStatus,
} from '../../store/users/actions';

import { AppState } from '../../store';
import { UserCursorUpdate, UserData } from '../../store/users/types';

import SocketContext from '../../sockets';

import TodoList from '../../components/Todo/TodoList';
import NoTodosView from '../../components/Todo/NoTodos';

import { ReactComponent as PlusIcon } from '../../icons/plus.svg';


const ListsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
    }
`;

const NewListButton = styled(PlusIcon)`
    position: fixed;
    width: 80px;
    height: 80px;

    bottom: 50px;
    right: -10px;
    cursor: pointer;

    transition: 150ms ease-out all;
    fill: ${props => props.theme.colors.blue};

    &:hover {
        fill: ${props => props.theme.colors.brightBlue};
        right: 5px;
    }

    @media screen and (max-width: 768px) {
        right: 10px!important;
        bottom: 30px;
    }
`;

type TodoPageProps = {

} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoPage: React.FC<TodoPageProps> = props => {
    
    const { socket } = useContext(SocketContext);

    const { 
        todo: { lists: todoLists },
        actions,
    } = props;

    useEffect(() => {
        const {
            fetchTodoLists, 
            fetchOtherUsers,
            updateTodoList,
            removeTodoList,
            addTodoList,
            addTodoListItem,
            updateTodoListItem,

            addOtherUser,
            removeOtherUser,
            updateUserEditingStatus,
        } = actions;
        // GET all todo lists from server to populate first.
        fetchTodoLists();

        // GET all online users
        fetchOtherUsers();

        // Establish the socket connection
        socket.connect();
        socket.on('connect', () => {
            console.log('SOCKET CONNECTED');
            
            socket.on('todo/add', ({ listId }: { listId: string }) => {
                addTodoList(listId);
            });
    
            type TodoUpdateRequest = {
                listId: string,
                data: {
                    title: string,
                }
            }
            socket.on('todo/update', (update: TodoUpdateRequest) => {
                updateTodoList(update.listId, update.data.title);
            });

            socket.on('todo/delete', (deleted: { listId: string }) => {
                removeTodoList(deleted.listId);
            });
    
            type TodoNewItemRequest = {
                listId: string,
                data: {
                    id: string,
                    label: string,
                }
            }
            socket.on('todo/addItem', (newItem: TodoNewItemRequest) => {
                addTodoListItem(newItem.listId, newItem.data.id, newItem.data.label);
            });
    
            type TodoUpdateItemRequest = {
                listId: string,
                itemId: string,
                data: {
                    label?: string,
                    isDone?: boolean,
                }
            }
            socket.on('todo/editItem', (updatedItem: TodoUpdateItemRequest) => {
                const {
                    listId,
                    itemId,
                    data: { label, isDone },
                } = updatedItem;
                updateTodoListItem(listId, itemId, label, isDone);
            });


            socket.on('users/new', (newUser: UserData) => {
                addOtherUser(newUser.username, newUser.color);
            });

            socket.on('users/leave', (goneUser: { username: string }) => {
                removeOtherUser(goneUser.username);
            });
            
            socket.on('user-cursor', (update: UserCursorUpdate) => {
                updateUserEditingStatus(update);
            });
        });

        socket.on('disconnect', () => {
            socket.removeAllListeners();
        });
    }, [socket, actions]);

    const { requestNewTodoList } = actions;
    const handleNewTodoList = () => {
        requestNewTodoList(socket);
    }

    if (todoLists.length > 0) {
        return (
            <React.Fragment>
                <ListsContainer>
                    {todoLists.map(list => (
                        <TodoList
                            key={list.id}
                            {...list} 
                        />
                    ))}
                </ListsContainer>
                <NewListButton onClick={handleNewTodoList} />
            </React.Fragment>
        );
    } else {
        return (
            <NoTodosView 
                onCTAClick={handleNewTodoList}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    todo: state.todo,
    users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        fetchTodoLists,
        updateTodoList,
        removeTodoList,
        requestNewTodoList,
        addTodoList,
        addTodoListItem,
        updateTodoListItem,

        addOtherUser,
        removeOtherUser,
        fetchOtherUsers,
        updateUserEditingStatus,
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoPage);