import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ match }) => {
    return (
        <nav>
            <div className="card shadow-sm">
                <div className="card-header">
                    <div className="row justify-content-between align-items-center">
                        <ul className="col-auto mb-0" style={{ listStyle: 'none' }}>
                            <li>
                                <NavLink to="/projects">
                                    <i className="fas fa-pencil-ruler fa-lg" title="Projects"></i>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="col-auto mb-0 ml-auto" style={{ listStyle: 'none' }}>
                            <li>
                                <NavLink to="/cart">
                                    <i className="fas fa-shopping-cart fa-lg" title="Cart"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;