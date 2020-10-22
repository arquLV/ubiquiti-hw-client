import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../../store';
import { UserData } from '../../../store/users/types';

import { ReactComponent as TodoLogo } from '../../../icons/todo.svg';
import Avatar from './Avatar';


const HeaderContainer = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;

    height: 57px;
    width: 100%;

    background: ${props => props.theme.colors.darkGrey};
`;

const LogoContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 57px;
    height: 100%;

    background-color: ${props => props.theme.colors.blue};
`;

const HeaderLogo = styled(TodoLogo)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;

    height: 100%;
    margin-left: 120px;

    @media screen and (max-width: 768px) {
        margin-left: 80px;
    }
`;

const OnlineUsersLabel = styled.div`
    text-transform: uppercase;
    font-size: 12px;
    color: ${props => props.theme.colors.white};

    margin-right: 24px;

    @media screen and (max-width: 768px) {
        margin-right: 12px;
    }
`;

type HeaderProps = ReturnType<typeof mapStateToProps>;
const Header: React.FC<HeaderProps> = props => {

    const { user, otherUsers } = props;
    
    let onlineUserAvatars;
    if (user) {
        onlineUserAvatars = (
            <AvatarContainer>
                <OnlineUsersLabel>Online users:</OnlineUsersLabel>
                <Avatar 
                    username={user.username}
                    color={user.color}
                    isSelf={true}
                />
                {otherUsers.map(otherUser => (
                    <Avatar 
                        key={`avatar-${otherUser.username}`}
                        username={otherUser.username}
                        color={otherUser.color}
                    />
                ))}
            </AvatarContainer>
        );
    }

    return (
        <HeaderContainer>
            <LogoContainer>
                <HeaderLogo />
            </LogoContainer>
            {onlineUserAvatars}
        </HeaderContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    user: state.users.user,
    otherUsers: state.users.otherUsers,
});

export default connect(mapStateToProps)(Header);