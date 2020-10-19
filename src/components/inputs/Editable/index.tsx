import React, { useEffect, useRef, useState } from 'react';
import styled, { StyledComponentBase } from 'styled-components';
import useClickOutside from '../../../hooks/useClickOutside';

const EditableInput = styled.input.attrs(props => ({
    type: 'text',
}))`
    border: none;
    font-size: inherit;
`;

type EditableProps = {
    textComponent: React.FC<any>,
    children: string,
}
const Editable: React.FC<EditableProps> = props => {
    const [editing, setEditState] = useState(false);
    const [content, setContent] = useState(props.children);
    
    const editableRef = useRef<HTMLInputElement>(null);
    useClickOutside(editableRef, () => {
        if (editing) {
            setEditState(false);
        }
    });

    useEffect(() => {
        if (editing) {
            editableRef.current?.focus();
        }
    }, [editing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as EventTarget & HTMLInputElement;
        console.log(target.selectionStart);
        if (["Enter", "Esc"].includes(e.key)) {
            setEditState(false);
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setEditState(true);
    }

    const { textComponent: TextComponent } = props;

    if (editing) {
        return (
            <TextComponent>
                <EditableInput
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    ref={editableRef}
                    value={content} 
                />
            </TextComponent>
        )
    } else {
        return (
            <TextComponent
                onClick={handleClick}
            >{content}</TextComponent>
        );
    }
}

export default Editable;