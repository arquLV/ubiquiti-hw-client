import React, { useCallback } from 'react';
import styled from 'styled-components';

import Checkbox from '../../inputs/Checkbox';
import Editable from '../../inputs/Editable';

const ItemContainer = styled.li`

`;

const ItemLabel = styled.label`
    display: inline-block;
    
    font-size: 16px;
    line-height: 1.2em;
    cursor: text;
`;

type TodoItemProps = {
    isDone: boolean,
    children: string,

    onCheckboxClick?: () => void,
}
const TodoItem: React.FC<TodoItemProps> = props => {

    const { onCheckboxClick } = props;

    return (
        <ItemContainer>
            <Checkbox checked={props.isDone} onChange={onCheckboxClick} />
            <Editable textComponent={ItemLabel}>{props.children}</Editable>
        </ItemContainer>
    );
}

export default TodoItem;