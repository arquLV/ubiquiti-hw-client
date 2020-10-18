import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import TodoList from './components/TodoList';

import logo from './logo.svg';
import './App.css';

import GlobalStyling from './styling/GlobalStyling';
import AppTheme from './styling/AppTheme';

const App: React.FC = props => {
    return (
        <React.Fragment>
            <Reset />
            <ThemeProvider theme={AppTheme}>
                <GlobalStyling />


                <div className="App">
                    <TodoList></TodoList>
                </div>
            </ThemeProvider>
            
        </React.Fragment>
    );
}

export default App;
