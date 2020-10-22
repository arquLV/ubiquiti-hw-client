import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div<{ bgColor: string, outline?: boolean }>`
    position: relative;
    
    width: 36px;
    height: 36px;
    border-radius: 100%;

    text-transform: uppercase;
    font-size: 24px;
    
    text-align: center;

    background-color: ${props => props.bgColor};
    color: ${props => props.theme.colors.white};
    
    border: ${props => props.outline ? `2px solid ${props.theme.colors.white}` : undefined};
    line-height: ${props => props.outline ? '32px' : '36px'};
    box-sizing: border-box;

    margin-right: 12px;
`;

type AvatarProps = {
    username: string,
    color: string,
    isSelf?: boolean,
}
const Avatar: React.FC<AvatarProps> = props => {
    const firstInitial = props.username[0];

    return (
        <AvatarContainer bgColor={props.color} outline={props.isSelf}>
            {firstInitial}
        </AvatarContainer>
    );
}

export default Avatar;