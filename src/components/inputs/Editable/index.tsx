import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../../hooks/useClickOutside';

const EditableInput = styled.input.attrs(props => ({
    type: 'text',
}))`
    border: none;
    font-size: inherit;
    font-weight: inherit;
    padding: 0;
    width: 100%;
`;

type EditableProps = {
    textComponent: React.FC<any>,

    children: string,
    placeholder?: string,

    onEdit?: (content: string) => void,

    [otherProps: string]: any,
}
const Editable: React.FC<EditableProps> = props => {
    const [editing, setEditState] = useState(false);
    
    const { 
        textComponent: TextComponent,
        children,
        placeholder,
        onEdit,
        ...restProps
    } = props;

    
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
        onEdit?.(e.target.value);
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

    

    if (editing) {
        return (
            <TextComponent {...restProps}>
                <EditableInput
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    ref={editableRef}
                    value={children} 
                    placeholder={placeholder}
                />
            </TextComponent>
        )
    } else {
        return (
            <TextComponent
                onClick={handleClick}
                {...restProps}
            >{children}</TextComponent>
        );
    }
}

export default Editable;