import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AppState } from '../../../store';
import { checkAuth } from '../../../store/users/actions';
import { UserAuthStatus } from '../../../store/users/types';

import Preload from '../../Preload';

type AuthCheckProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

/**
 * Checks authentication status on first mount. 
 * Only proceeds to render children (app routes) after we know user status.
 */
const AuthCheck: React.FunctionComponent<AuthCheckProps> = props => {
    useEffect(() => {
        props.checkAuth();
    }, []);

    return props.authChecked ? (
        <>{props.children}</>
    ) : <Preload />;
}

const mapStateToProps = (state: AppState) => ({
    authChecked: state.users.authStatus !== UserAuthStatus.Unknown,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({ checkAuth }, dispatch), 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthCheck);