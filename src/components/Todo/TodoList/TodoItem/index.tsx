import React from 'react';
import styled from 'styled-components';

import Checkbox from '../../../inputs/Checkbox';
import Editable from '../../../inputs/Editable';

const ItemContainer = styled.li`
    position: relative;
    display: flex;

    margin: 16px 0;
`;

const ItemLabel = styled.label<{ crossedOut: boolean }>`
    position: relative;
    display: inline-block;

    min-width: 200px;
    flex: 1 1 auto;

    margin-left: 12px;
    
    font-size: 16px;
    line-height: 24px;
    cursor: text;

    word-wrap: break-word;
    white-space: normal;


    text-decoration: ${props => props.crossedOut ? 'line-through' : 'none'};
`;

type TodoItemProps = {
    isDone: boolean,
    children: string,

    onCheckboxClick?: () => void,
    onLabelEdit?: (newLabel: string) => void,
    onLabelStopEditing?: () => void,
    onLabelCursorChange?: (start: number, end: number) => void,

    otherUserEditing?: {
        color: string,
        cursorStart: number,
        cursorEnd: number,
    },
}
const TodoItem: React.FC<TodoItemProps> = props => {

    const { 
        isDone,
        otherUserEditing,
        onCheckboxClick,
        onLabelEdit,
        onLabelStopEditing,
        onLabelCursorChange,
    } = props;

    return (
        <ItemContainer>
            <Checkbox checked={isDone} onChange={onCheckboxClick} />
            <Editable 
                textComponent={ItemLabel}
                onEdit={onLabelEdit}
                onStopEditing={onLabelStopEditing}
                onCursorChange={onLabelCursorChange}

                crossedOut={isDone}
                showUserEditing={otherUserEditing}
            >{props.children}</Editable>
        </ItemContainer>
    );
}

export default TodoItem;