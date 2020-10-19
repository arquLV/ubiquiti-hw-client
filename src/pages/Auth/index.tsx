import React from 'react';
import styled from 'styled-components';

import AuthInput from '../../components/Auth/AuthInput';
import AuthButton from '../../components/Auth/AuthButton';

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

const AuthPage: React.FC = props => {
    return (
        <main>
            <AuthForm>
                <AuthInput name="username">Username</AuthInput>
                <AuthInput name="password" type="password">Password</AuthInput>

                <AuthButton>Login / Sign Up</AuthButton>
            </AuthForm>
        </main>
    );
}

export default AuthPage;