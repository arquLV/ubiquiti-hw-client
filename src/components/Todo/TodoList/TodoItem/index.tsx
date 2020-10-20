import React, { useCallback } from 'react';
import styled from 'styled-components';

import Checkbox from '../../../inputs/Checkbox';
import Editable from '../../../inputs/Editable';

const ItemContainer = styled.li`
    display: flex;
    margin: 16px 0;
`;

const ItemLabel = styled.label`
    display: inline-block;

    margin-left: 12px;
    
    font-size: 16px;
    line-height: 24px;
    cursor: text;
`;

type TodoItemProps = {
    isDone: boolean,
    children: string,

    onCheckboxClick?: () => void,
    onLabelEdit?: (newLabel: string) => void,
}
const TodoItem: React.FC<TodoItemProps> = props => {

    const { 
        onCheckboxClick,
        onLabelEdit,
    } = props;

    return (
        <ItemContainer>
            <Checkbox checked={props.isDone} onChange={onCheckboxClick} />
            <Editable 
                textComponent={ItemLabel}
                onEdit={onLabelEdit}
            >{props.children}</Editable>
        </ItemContainer>
    );
}

export default TodoItem;