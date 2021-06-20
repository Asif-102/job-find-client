import React from 'react';
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const user = localStorage.getItem("userName");
    // console.log(user);

    const history = useHistory();

    const logOut = () => {
        localStorage.clear();
        history.go(0);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">Job Find</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">{user?`${user}`:''}</span></a>
                        </li>
                        <li className="nav-item active ml-5 mr-5">
                            {!user && <a className="nav-link" href="/login">Login</a>}
                            {user && <b className="mr-5 ml-5">{user}</b>}
                            {user && <button onClick={logOut} className="custom-btn">Log Out</button>}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;