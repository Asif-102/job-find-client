import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const user = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    const [isEmployer, setIsEmployer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const history = useHistory();

    const logOut = () => {
        localStorage.clear();
        history.push('/');
        history.go(0);
    }

    useEffect(() => {
        fetch(`https://mighty-coast-51208.herokuapp.com/findEmployer?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setIsEmployer(data.length)
                localStorage.setItem('accountCategory', data[0]?.category)
            })

        fetch(`https://mighty-coast-51208.herokuapp.com/findAdmin?email=${email}`)
            .then(res => res.json())
            .then(data => setIsAdmin(data.length))

    }, [email])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">Job Find</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item active" style={{ display: isEmployer ? '' : 'none' }}>
                            <a className="nav-link" href="/employerDashboard">Employer Dashboard</a>
                        </li>

                        <li className="nav-item active" style={{ display: isAdmin ? '' : 'none' }}>
                            <a className="nav-link" href="/adminDashboard">Admin Dashboard</a>
                        </li>

                        <li className="nav-item active">
                            <a className="nav-link" href="#"><span className="sr-only">{user ? `${user}` : ''}</span></a>
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