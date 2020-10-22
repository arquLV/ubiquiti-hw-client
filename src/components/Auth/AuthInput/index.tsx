import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
    position: relative;
    border-radius: 4px;
    margin: 32px 0;

    background: ${props => props.theme.colors.white};
`;

type InputLabelProps = {
    maximized?: boolean,
}
const InputLabel = styled.label<InputLabelProps>`
    position: absolute;

    top: -24px;
    left: 0;
    font-size: 12px;
    line-height: 24px;

    color: ${props => props.theme.colors.darkGrey};

    transition: 150ms all ease-out;

    ${props => props.maximized && css`
        pointer-events: none;

        font-size: 18px;
        line-height: 24px;

        top: 50%;
        left: 16px;
        transform: translate3d(0, -50%, 0);
    `}
`;

const InputField = styled.input`
    display: block;
    width: 100%;
    padding: 14px 16px;
    box-sizing: border-box;

    border: none;
    font-size: 18px;
    line-height: 24px;
`;

type AuthInputProps = {
    name: string,
    children: string,
    type?: 'text' | 'password',

    onChange?: (newContent: string) => void,
}
const AuthInput: React.FC<AuthInputProps> = props => {
    const [content, setContent] = useState('');
    const isEmpty = content.length === 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        props.onChange?.(e.target.value);
    }

    return (
        <InputWrapper>
            <InputLabel
                maximized={isEmpty}
            >{props.children}</InputLabel>
            <InputField
                onChange={handleChange}
                type={props.type || 'text'}
                value={content}
                required={true}
            />
        </InputWrapper>
    );
}

export default AuthInput;