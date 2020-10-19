import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../store';

const NoTodosWrapper = styled.div`
    position: absolute;

    top: 50%;
    left: 50%;

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
    line-height: 44px;
`;

const NoTodosCTA = styled.h3`
    font-weight: 700;
    font-size: 32px;
`;

const NoTodosView: React.FC = props => {
    return (
        <NoTodosWrapper>
            <NoTodosTitle>No ToDo lists yet!</NoTodosTitle>
            <NoTodosCTA>Click here to create one!</NoTodosCTA>
        </NoTodosWrapper>
    );
}

type TodoPageProps = {

} & ReturnType<typeof mapStateToProps>;
const TodoPage: React.FC<TodoPageProps> = props => {
    console.log(props);

    return (
        <NoTodosView />
    );
}

const mapStateToProps = (state: AppState) => ({
    ...state.todo,
});

export default connect(mapStateToProps)(TodoPage);