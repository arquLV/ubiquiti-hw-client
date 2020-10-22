import React, { useContext } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AppState } from '../../../store';
import { logOut } from '../../../store/users/actions';
import SocketContext from '../../../sockets';

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

const Logout = styled.div`
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    cursor: pointer;

    text-transform: uppercase;
    font-size: 12px;
    color: ${props => props.theme.colors.white};
`;

type HeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const Header: React.FC<HeaderProps> = props => {
    const { socket } = useContext(SocketContext);
    const { 
        user, 
        otherUsers,
        actions: { logOut },
    } = props;
    
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

            {user && <Logout onClick={() => { logOut(socket); }}>Log Out</Logout>}
        </HeaderContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    user: state.users.user,
    otherUsers: state.users.otherUsers,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({ logOut }, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);