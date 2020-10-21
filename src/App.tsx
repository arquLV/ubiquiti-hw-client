import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import { AppState } from './store';

import AuthPage from './pages/Auth';
import TodoPage from './pages/Todo';
import AuthCheck from './components/Auth/AuthCheck';

import GlobalStyling from './styling/GlobalStyling';
import AppTheme from './styling/AppTheme';

import { ReactComponent as TodoLogo } from './icons/todo.svg';


const AppContainer = styled.div`
    height: 100vh;
    box-sizing: border-box;
    padding-top: 57px;
`;

const ContentWrapper = styled.div`
    position: relative;
    height: 100%;
`;

const Header = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;

    height: 57px;
    width: 100%;

    background: ${props => props.theme.colors.darkGrey};
`;

const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 14px;

    padding: 0 12px;
    box-sizing: border-box;

    color: ${props => props.theme.colors.darkGrey};
    text-align: right;

    @media screen and (max-width: 768px) {
        text-align: center;
    }
`;

const HeaderLogo = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 57px;
    height: 100%;

    background-color: ${props => props.theme.colors.blue};

    svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
`;

type AppProps = ReturnType<typeof mapStateToProps>;
const App: React.FC<AppProps> = props => {

    const { user } = props;

    return (
        <React.Fragment>
            <Reset />
            <ThemeProvider theme={AppTheme}>
                <GlobalStyling />

                <AuthCheck>
                    <AppContainer>
                        <Header>
                            <HeaderLogo>
                                <TodoLogo />
                            </HeaderLogo>
                        </Header>
                        <ContentWrapper>
                
                            {
                            // Not much point for Router. Render Auth if no user,
                            // render Todo if have one.
                            user !== null ? (
                                <TodoPage />
                            ) : (
                                <AuthPage />
                            )}
                
                        </ContentWrapper>

                        <Footer>Ubiquiti Home Assignment by Arturs Kurzemnieks</Footer>
                    </AppContainer>
                </AuthCheck>
            </ThemeProvider>
            
        </React.Fragment>
    );
}

const mapStateToProps = (state: AppState) => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(App);

