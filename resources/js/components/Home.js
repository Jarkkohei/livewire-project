import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/combiner';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

import Projects from './Projects';
import Tasks from './Tasks';

const Home = (props) => { 
    return ( 
        <div className="container">
            <div className="row">
                <Router>
                    
                    <div className="col-12 col-lg-4 col-xl-3 mt-3">
                        <Projects />
                    </div>
                    
                    <div className="col-12 col-lg-8 col-xl-9 mt-3">
                        <Switch>
                            <Route path='/home' exact component={Tasks} />
                        </Switch>
                    </div>
                    
                </Router>
            </div>
        </div> 
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(
        <Provider store={store}>
            <Home />
        </Provider>,
        document.getElementById('home')
    );
}
