import { combineReducers } from 'redux';

import todo from './todo/reducer';
import users from './users/reducer';

const rootReducer = combineReducers({
    todo,
    users,
});

export default rootReducer;