import React from 'react';
import styled from 'styled-components';

import { ReactComponent as TodoIcon } from '../../icons/todo.svg';

const PreloadContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    height: 100vh;
    background-color: ${props => props.theme.colors.darkGrey};
`;

const TodoLogo = styled(TodoIcon)`
    position: absolute;

    width: 160px;
    height: 160px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Preload: React.FC = () => {
    return (
        <PreloadContainer>
            <TodoLogo />
        </PreloadContainer>
    );
}

export default Preload;