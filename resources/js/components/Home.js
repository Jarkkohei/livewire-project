import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Projects from './Projects';
import Tasks from './Tasks';
import EditTask from './EditTask';

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
                            <Route path='/projects/:project_id' exact component={Tasks} />
                            <Route path='/projects/:project_id/edit' exact component={EditTask} />
                        </Switch>
                    </div>
                    
                </Router>
            </div>
        </div> 
    );
}

export default Home;
