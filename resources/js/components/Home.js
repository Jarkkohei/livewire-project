// Instantiated in components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProjectMenu from './ProjectMenu';
import TaskList from './TaskList';
import NavBar from './NavBar';

const Home = () => {

    return (
        <>
        <div id="modal_root"></div>
        
        <div className="container">
            <div className="row">
                <Router>
                    <div className="col-12 mt-2">
                        <NavBar />
                    </div>
                    
                    <div className="col-12 col-lg-4 col-xl-3 mt-3">
                        <Switch>
                            <Route path="/projects/:project_id" component={ProjectMenu} />
                            <Route path="/projects" component={ProjectMenu} />
                        </Switch>
                    </div>
                    
                    <div className="col-12 col-lg-8 col-xl-9 mt-3">
                        <Switch>
                            <Route path='/projects/:project_id/tasks/:task_id' component={TaskList} />
                            <Route path='/projects/:project_id/tasks' component={TaskList} />
                            <Route path='/projects/:project_id/create' component={TaskList} />
                            <Route path='/projects/:project_id/edit' component={TaskList} />
                            <Route path='/projects' component={TaskList} />
                        </Switch>
                    </div>
                    
                </Router>
            </div>
        </div> 
        </>
    );
}

export default Home;
