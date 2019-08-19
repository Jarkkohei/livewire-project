import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/combiner';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

import Home from './Home';

const App = (props) => {
    return (
        <Home />
    );
}

export default Home;

if (document.getElementById('application')) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('application')
    );
}