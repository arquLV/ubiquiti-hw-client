import { createGlobalStyle } from 'styled-components';

import { ThemeType } from './AppTheme';

export default createGlobalStyle<{ theme: ThemeType }>`
    body {
        font-family: ${props => props.theme.fonts.primary}, sans-serif;
        background-color: ${props => props.theme.colors.lightGrey};
    }

    input, button {
        font-family: ${props => props.theme.fonts.primary}, sans-serif;
        &:focus {
            outline: none;
        }
    }
`;