import styled from 'styled-components';

import checkIcon from '../../../icons/check.svg';

const Checkbox = styled.input.attrs(props => ({
    type: 'checkbox',
}))`
    -webkit-appearance: none;

    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 2px solid ${props => props.theme.colors.lightGrey};

    margin: 0;

    cursor: pointer;

    &:hover {
        border-color: ${props => props.theme.colors.mediumGrey};
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

export default Checkbox;
