import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';
import { AppState } from '../../store';

import {
    signupUser,
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

type AuthPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const AuthPage: React.FC<AuthPageProps> = props => {

    const {
        actions: { signupUser },
    } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                    onClick={() => { signupUser(username, password); }}
                >Sign Up</AuthButton>
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
    }, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPage);