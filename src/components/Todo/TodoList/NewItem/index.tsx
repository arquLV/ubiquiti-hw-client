import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as PlusIcon } from '../../../../icons/plus.svg';

const NewItemContainer = styled.div`
    margin: 24px 0 0 24px;
    display: flex;
`;


const AddIcon = styled(PlusIcon)<{ $canAdd?: boolean }>`
    height: 24px;
    width: 24px;

    fill: ${props => props.$canAdd ? props.theme.colors.blue : props.theme.colors.mediumGrey};
    cursor: pointer;

    transition: 100ms fill ease-out;

    &:hover {
        fill: ${props => props.$canAdd ? props.theme.colors.brightBlue : props.theme.colors.darkGrey};
    }
`;

const NewItemInput = styled.input`
    border: none;
    margin-left: 12px;
`;

type NewItemsProps = {
    onSubmit: (content: string) => void,
}
const NewItem: React.FC<NewItemsProps> = props => {

    const [content, setContent] = useState('');
    const isEmpty = content.length === 0;

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        props.onSubmit(content);

        // Reset input field content to empty string
        setContent('');
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Tab"].includes(e.key) && !isEmpty) {
            submit();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handleAddBtnClick = () => {
        if (isEmpty) {
            inputRef.current?.focus();
        } else {
            submit();
        }
    }

    return (
        <NewItemContainer>
            <AddIcon 
                $canAdd={!isEmpty}
                onClick={handleAddBtnClick}
            />
            <NewItemInput 
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress} 
                value={content}

                ref={inputRef}
                placeholder="New Item"
            />
        </NewItemContainer>
    );
}

export default NewItem;