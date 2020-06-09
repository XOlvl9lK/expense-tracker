import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = () => {
        logout();
        history.push('/')
    };

    const navHandler = (event, to) => {
        document.querySelector('.active').classList.toggle('active');
        event.target.classList.toggle('active');

        if (to === '/main') {
            history.push(to);
        }
        if (to === '/history') {
            history.push(to);
        }
    };

    return (
        <div className="navbar container">
            <ul>
                <li onClick={event => navHandler(event, '/main')} className="active">Tracker</li>
                <li onClick={event => navHandler(event, '/history')}>History</li>
                <li onClick={logoutHandler}><i className="fa fa-sign-out" aria-hidden="true" /></li>
            </ul>
        </div>
    );
};