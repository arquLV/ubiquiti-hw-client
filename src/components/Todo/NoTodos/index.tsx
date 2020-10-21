import React from 'react';
import styled from 'styled-components';

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

export default NoTodosView;