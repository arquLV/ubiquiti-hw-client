import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import { AppState } from './store';

import AuthPage from './pages/Auth';
import TodoPage from './pages/Todo';
import AuthCheck from './components/Auth/AuthCheck';
import Header from './components/layout/Header';

import GlobalStyling from './styling/GlobalStyling';
import AppTheme from './styling/AppTheme';



const AppContainer = styled.div`
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 57px;

`;

const ContentWrapper = styled.div`
    position: relative;
    height: 100%;
    flex-grow: 1;
`;



const Footer = styled.footer`
    position: static;
    bottom: 0;
    left: 0;

    width: 100%;
    line-height: 24px;
    font-size: 14px;

    padding: 8px 12px;
    box-sizing: border-box;

    color: ${props => props.theme.colors.darkGrey};
    text-align: right;

    @media screen and (max-width: 768px) {
        text-align: center;
    }
`;



type AppProps = ReturnType<typeof mapStateToProps>;
const App: React.FC<AppProps> = props => {

    const { user } = props;
    const isAuthenticated = user !== null;

    return (
        <React.Fragment>
            <Reset />
            <ThemeProvider theme={AppTheme}>
                <GlobalStyling />

                <AuthCheck>
                    <AppContainer>
                        <Header />
                        <ContentWrapper>
                
                            {
                            // Not much point for Router. Render Auth if no user,
                            // render Todo if have one.
                            isAuthenticated ? (
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

