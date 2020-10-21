import styled from 'styled-components';

const AuthButton = styled.button.attrs(props => ({
    type: 'button',
}))`
    position: relative;
    display: block;

    border: none;
    background-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.white};
    border-radius: 4px;

    text-transform: uppercase; 
    font-weight: 700;

    height: 52px;
    width: 100%;

    cursor: pointer;
    transition: 100ms all ease-out;

    &:hover {
        background-color: ${props => props.theme.colors.brightBlue};
    }
`;

export default AuthButton;