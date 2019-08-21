import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { useSelector, useDispatch, useActions } from 'react-redux';

import Projects from './Projects';
import Tasks from './Tasks';

const Home = (props) => {
    const tasks = useSelector(state => state.tasks.tasks);
    //const projects = useSelector(state => state.projects.projects);

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
