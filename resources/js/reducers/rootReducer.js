import { combineReducers } from 'redux';

import { tasks } from './tasks';
import { projects } from './projects';

export default combineReducers({
    projects,
    tasks,
});