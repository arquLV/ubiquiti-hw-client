import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { 
    fetchTodoLists,
    updateTodoList,
    requestNewTodoList,
    addTodoList,
    addTodoListItem,
    updateTodoListItem,
} from '../../store/todo/actions';
import { AppState } from '../../store';

import SocketContext from '../../sockets';

import TodoList from '../../components/Todo/TodoList';
import NewList from '../../components/Todo/NewList';
import NoTodosView from '../../components/Todo/NoTodos';



const ListsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`;

type TodoPageProps = {

} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoPage: React.FC<TodoPageProps> = props => {
    
    const { socket } = useContext(SocketContext);

    const { 
        todo: { lists: todoLists },
        actions: {
            fetchTodoLists, 
            updateTodoList,
            requestNewTodoList,
            addTodoList,
            addTodoListItem,
            updateTodoListItem,
        },
    } = props;

    useEffect(() => {
        // GET all todo lists from server to populate first.
        fetchTodoLists();

        // Establish the socket connection
        socket.connect();
        socket.on('connect', () => {
            console.log('SOCKET CONNECTED');
            
            socket.on('todo/add', ({ listId }: { listId: string }) => {
                console.log(listId);
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

            type NewUserData = {
                username: string,
                color: string,
            }
            socket.on('users/new', (newUser: NewUserData) => {
                console.log(newUser);
            });

            type UserCursorUpdate = {
                username: string,
                id: string[],
                start: number,
                end: number,
            }
            socket.on('user-cursor', (update: UserCursorUpdate) => {
                console.log(update);
            });
        });


    }, [socket]);

    if (todoLists.length > 0) {
        return (
            <ListsContainer>
                <NewList />
                <TodoList></TodoList>
            </ListsContainer>
        );
    } else {
        return (
            <NoTodosView 
                onCTAClick={() => {
                    requestNewTodoList(socket);
                }}
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
        requestNewTodoList,
        addTodoList,
        addTodoListItem,
        updateTodoListItem,
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoPage);