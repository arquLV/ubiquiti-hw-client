import React from 'react';
import styled from 'styled-components';

const NewListContainer = styled.div`
    position: relative;

    width: 400px;
    height: 400px;

    border: 2px solid ${props => props.theme.colors.mediumGrey};
    border-radius: 8px;
    margin: 32px 0 0 32px;

    cursor: pointer;

    transition: 100ms all ease-out;
    font-size: 24px;
    opacity: 0.5;

    &:hover {
        font-size: 26px;
        opacity: 1;
    }
`;

const NewListCTA = styled.h3`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
`;

const NewList: React.FC = props => {
    return (
        <NewListContainer>
            <NewListCTA>New ToDo List</NewListCTA>
        </NewListContainer>
    );
}

export default NewList;
