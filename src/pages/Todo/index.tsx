import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { 
    updateTodoList,
    requestNewTodoList,
    addTodoList,
} from '../../store/todo/actions';
import { AppState } from '../../store';

import SocketContext from '../../sockets';

import TodoList from '../../components/Todo/TodoList';
import NewList from '../../components/Todo/NewList';

const NoTodosWrapper = styled.div`
    position: absolute;

    top: 50%;
    left: 50%;

    max-width: 100%;
    width: 600px;
    padding: 200px 0;

    transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
    transition: 150ms all ease-out;
    cursor: pointer;

    text-align: center;
    color: ${props => props.theme.colors.mediumGrey};
    opacity: 0.8;

    &:hover {
        transform: translate3d(-50%, -50%, 0) scale3d(1.1, 1.1, 1);
        opacity: 1;
    }
`;

const NoTodosTitle = styled.h2`
    font-weight: 900;
    font-size: 36px;
    line-height: 52px;
`;

const NoTodosCTA = styled.h3`
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
`;

type NoTodosProps = {
    onCTAClick?: () => void,
}
const NoTodosView: React.FC<NoTodosProps> = props => {
    return (
        <NoTodosWrapper onClick={props.onCTAClick}>
            <NoTodosTitle>No ToDo lists yet!</NoTodosTitle>
            <NoTodosCTA>Click here to create one!</NoTodosCTA>
        </NoTodosWrapper>
    );
}

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
        lists: todoLists,
        actions: { 
            updateTodoList,
            requestNewTodoList,
            addTodoList,
        },
    } = props;

    useEffect(() => {
        console.log('SETTING UP SOCKET LISTENER');

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
    ...state.todo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        updateTodoList,
        requestNewTodoList,
        addTodoList,
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoPage);