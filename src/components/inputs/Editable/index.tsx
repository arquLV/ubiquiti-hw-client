import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
 import TextareaAutosize from 'react-textarea-autosize';

import useClickOutside from '../../../hooks/useClickOutside';


const EditableInput = styled(TextareaAutosize)`
    display: inline-block;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0;
    width: 100%;
    height: 100%;

    resize: none;
    vertical-align: top;
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

    
    const editableRef = useRef<HTMLTextAreaElement>(null);
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onEdit?.(e.target.value);
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const target = e.target as EventTarget & HTMLTextAreaElement;
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

                    rows={1}
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