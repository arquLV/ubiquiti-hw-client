import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../store';
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

const NewItem: React.FC = props => {

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Tab"].includes(e.key)) {
            console.log('Submit!');
        }
    }

    return (
        <li>
            <input type="text" onKeyDown={handleKeyPress} />
        </li>
    );
}

type TodoListProps = {} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const TodoList: React.FC<TodoListProps> = props => {
    console.log(props);
    return (
        <TodoListContainer>
            <ListHeading>{props.todoList.title}</ListHeading>

            <ItemsList>
                <TodoItem>
                    {props.todoList.items.map(item => (
                        <Checkbox 
                            key={item.id}
                            name={item.id}
                            checked={item.isDone}
                        >{item.label}</Checkbox>
                    ))}
                </TodoItem>

                <NewItem />
            </ItemsList>
        </TodoListContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    todoList: state.todo.lists[state.todo.activeListIdx],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);