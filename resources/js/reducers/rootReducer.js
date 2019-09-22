import { combineReducers } from 'redux';

import { tasks } from './tasks';
import { projects } from './projects';
import { auth } from './auth';

export default combineReducers({
    projects,
    tasks,
    auth,
});