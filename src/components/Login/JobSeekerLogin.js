import React from 'react';
import { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';

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
        history.replace(from);
        history.go(0);
    }

    const handleCreateAccount = (event) => {
        if (user.email && user.password && user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // setSignedInUser(user);
                    const name = user.firstName + ' ' + user.lastName;
                    const newUser = { ...user };
                    newUser.displayName = name;
                    // setSignedInUser(newUser);
                    updateUserProfile(name);
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }
        else {
            setErrorMessage("Password & Confirm Password don't match")
        }
        event.preventDefault();
    }

    const updateUserProfile = (name) => {
        const newUser = firebase.auth().currentUser;
        newUser.updateProfile({
            displayName: name,
        })
            .then(function () {
                successLogin(name, newUser.email);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    

    return (
        <div className="login-container text-center mt-5">
            <div>
                <h1>Create an account</h1>
                <br />
                <form>
                    <div className="form-group">
                        <input onBlur={handleBlur} name="firstName" type="text" className="form-control" placeholder="First Name" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="lastName" type="text" className="form-control" placeholder="Last Name" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="email" type="email" className="form-control" placeholder="Email" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="password" type="password" className="form-control" placeholder="Password" required />
                    </div>

                    <div className="form-group">
                        <input onBlur={handleBlur} name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" required />
                    </div>

                    <button onClick={handleCreateAccount} type="submit" style={{ width: '100%' }} className="custom-btn">Sign Up</button>

                </form>
                <br />
                
                <p>Don't have an account? <b style={{ cursor: 'pointer', color: '#275A53' }}>Register here</b></p>

            </div>
            <h3 className="text-danger">{errorMessage}</h3>
            <br />
            
        </div>
    );
};

export default Login;