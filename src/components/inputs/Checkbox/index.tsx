import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../../hooks/useClickOutside';


const CheckboxInput = styled.input.attrs(props => ({
    type: 'checkbox',
}))`
    -webkit-appearance: none;

    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 2px solid #eee;

    &:hover {
        border-color: #ccc;
    }
`;

const CheckboxLabel = styled.label`

`;

const CheckboxContainer = styled.div`

`;

const EditableInput = styled.input.attrs(props => ({
    type: 'text',
}))`
    border: none;
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
