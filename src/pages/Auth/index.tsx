import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import { AppState } from '../../store';

import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';

import {
    signupUser,
    logIn,
} from '../../store/users/actions';

const AuthForm = styled.form`
    display: block;
    position: absolute;
    top: 160px;
    left: 50%;

    width: 400px;
    padding: 32px 24px;
    box-sizing: border-box;

    transform: translate3d(-50%, 0, 0);

    @media screen and (max-width: 768px) {
        top: 0;
        width: 100%;
    }
`;

const ShowLogin = styled.div`
    text-align: center;
    padding-top: 32px;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.blue};
    }
`;

type AuthPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const AuthPage: React.FC<AuthPageProps> = props => {

    const [showLogin, setShowLogin] = useState(false);

    const {
        actions: { signupUser, logIn },
    } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Should do proper validation and password requirements here.
        // Hope this'll do for a proof of concept.
        if (username.length > 3 && password.length > 3) {
            signupUser(username, password);
        } else {
            // Proper UI to show error messages also wouldn't hurt.
            window.alert('Username and/or password needs to be at least 4 characters long!');
        }
    }

    const handleLogin = () => {
        if (username.length > 3 && password.length > 3) {
            logIn(username, password);
        } else {
            window.alert('Please specify username and password!');
        }
    }

    return (
        <main>
            <AuthForm>
                <AuthInput 
                    name="username"
                    onChange={newUsername => { setUsername(newUsername); }}
                >Username</AuthInput>
                <AuthInput 
                    name="password" 
                    type="password"
                    onChange={newPassword => { setPassword(newPassword); }}
                >Password</AuthInput>


                <AuthButton
                    onClick={handleSignup}
                >Sign Up</AuthButton>
                
                {showLogin ? (
                    <AuthButton
                    onClick={handleLogin}
                >Login</AuthButton>
                ) : (
                    <ShowLogin onClick={() => { setShowLogin(true); }}>Already have an account?</ShowLogin>
                )}
            </AuthForm>
        </main>
    );
}


const mapStateToProps = (state: AppState) => ({
    users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        signupUser,
        logIn,
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPage);