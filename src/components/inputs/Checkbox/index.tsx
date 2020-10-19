import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../../hooks/useClickOutside';

import checkIcon from '../../../icons/check.svg';

const CheckboxInput = styled.input.attrs(props => ({
    type: 'checkbox',
}))`
    -webkit-appearance: none;

    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 2px solid #eee;

    cursor: pointer;

    &:hover {
        border-color: #ccc;
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);

        opacity: 0;
        height: 0;
        width: 0;

        background-image: url(${checkIcon});
        background-size: cover;

        transition: all 100ms ease-out;
    }

    &:checked:after {
        opacity: 1;
        width: 16px;
        height: 16px;
    }
`;

const CheckboxLabel = styled.label`
    display: inline-block;
    
    font-size: 16px;
    line-height: 1.2em;
    cursor: text;
`;

const CheckboxContainer = styled.div`

`;

const EditableInput = styled.input.attrs(props => ({
    type: 'text',
}))`
    border: none;
    font-size: inherit;
`;

type EditableProps = {
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

    if (editing) {
        return (
            <EditableInput
                onChange={handleChange}
                onKeyDown={handleKeydown}
                ref={editableRef}
                value={content} 
            />
        )
    } else {
        return (
            <CheckboxLabel
                onClick={handleClick}
            >{content}</CheckboxLabel>
        );
    }
}

type CheckboxProps = {} & React.HTMLProps<HTMLInputElement>;

const Checkbox: React.FC<CheckboxProps> = props => {
    return (
        <CheckboxContainer>
            <CheckboxInput name={props.name} />
            {/* <CheckboxLabel htmlFor={props.name}><Editable>{props.children}</Editable></CheckboxLabel> */}
            <Editable>test</Editable>
        </CheckboxContainer>
    );
}

export default Checkbox;
