import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import useClickOutside from '../../../hooks/useClickOutside';
import { on } from 'cluster';


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

const EditingHighlight = styled.span<{ color: string, cursorOnly?: boolean }>`
    background-color: ${props => props.color};

    ${props => props.cursorOnly && css`
        margin-left: -2px;
        padding-left: 2px;
    `}
`;

type EditableProps = {
    textComponent: React.FC<any>,

    children: string,
    placeholder?: string,

    showUserEditing?: {
        color: string,
        cursorStart: number,
        cursorEnd: number,
    }

    onEdit?: (content: string) => void,
    onCursorChange?: (start: number, end: number) => void,

    [otherProps: string]: any,
}
const Editable: React.FC<EditableProps> = props => {
    const [editing, setEditState] = useState(false);
    
    const { 
        textComponent: TextComponent,
        children,
        placeholder,
        showUserEditing,

        onEdit,
        onCursorChange,
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
        console.log(e);
        onEdit?.(e.target.value);
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const target = e.target as EventTarget & HTMLTextAreaElement;
 
        if (["Enter", "Esc"].includes(e.key)) {
            setEditState(false);
        } else {
            onCursorChange?.(target.selectionStart, target.selectionEnd);
        }
    }

    const handleInactiveClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setEditState(true);
    }

    const handleActiveClick = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
        const target = e.target as EventTarget & HTMLTextAreaElement;
        onCursorChange?.(target.selectionStart, target.selectionEnd);
    }
    

    if (editing) {
        return (
            <TextComponent {...restProps}>
                <EditableInput
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    onClick={handleActiveClick}

                    ref={editableRef}
                    value={children} 
                    placeholder={placeholder}

                    rows={1}
                />
            </TextComponent>
        )
    } else {
        // If not editing yourself, show other users editing the item 
        let content: any = children;
        if (showUserEditing) {
            const { 
                cursorStart, 
                cursorEnd,
                color: userColor,
            } = showUserEditing;
            
            const selectionLength = cursorEnd - cursorStart;
            content = (
                <React.Fragment>
                    {children.slice(0, cursorStart)}
                    <EditingHighlight 
                        color={userColor}
                        cursorOnly={selectionLength === 0}
                    >
                        {children.slice(cursorStart, cursorEnd)}
                    </EditingHighlight>
                    {children.slice(cursorEnd)}
                </React.Fragment>
            );
        }    

        return (
            <TextComponent
                onClick={handleInactiveClick}
                {...restProps}
            >{content}</TextComponent>
        );
    }
}

export default Editable;