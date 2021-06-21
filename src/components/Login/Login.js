import React from 'react';
import { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useHistory, useLocation, Link } from 'react-router-dom';

const Login = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

    const successLogin = (name, email) => {
        localStorage.setItem('userName', name);
        localStorage.setItem('email', email);
        // localStorage.setItem('isAdmin', isAdmin);
        history.replace(from);
        history.go(0);
    }

    const handleLogin = (event) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.displayName = res.user.displayName;
                setUser(newUserInfo);
                // setSignedInUser(newUserInfo);
                successLogin(newUserInfo.displayName, newUserInfo.email);
            })
            .catch(function (error) {
                setErrorMessage(error.message);
            });
        event.preventDefault();
    }

    return (
        <div className="login-container text-center mt-5">
            <div>
                <h1>Login</h1>
                <br />
                <form>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="email" type="email" className="form-control" placeholder="Email" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="password" type="password" className="form-control" placeholder="Password" required />
                    </div>

                    <button onClick={handleLogin} type="submit" style={{ width: '100%' }} className="custom-btn">Login</button>
                </form>
                <br />
                <p>Don't have an account? <b style={{ cursor: 'pointer', color: '#275A53' }}><Link to="/accountType">Register here</Link></b></p>
            </div>
            <h3 className="text-danger">{errorMessage}</h3>
        </div>
    );
};

export default Login;