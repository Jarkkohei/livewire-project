import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Projects from './Projects';
import Tasks from './Tasks';
import TaskShow from './TaskShow';
import TaskEdit from './TaskEdit';

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
                            <Route exact path="/projects" render={() => <Redirect to="/projects/recent" />} />
                            <Route path='/projects/recent' exact component={Tasks} />
                            <Route path='/projects/:project_id/tasks' exact component={Tasks} />
                            <Route path='/projects/:project_id/tasks/:task_id' exact component={TaskShow} />
                            <Route path='/projects/:project_id/tasks/:task_id/edit' exact component={TaskEdit} />
                        </Switch>
                    </div>
                    
                </Router>
            </div>
        </div> 
    );
}

export default Home;
