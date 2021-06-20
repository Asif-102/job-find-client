import React, { useState, useRef } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import ProcessPayment from './ProcessPayment/ProcessPayment';
import { useHistory, useLocation } from 'react-router-dom';

const EmployerLogin = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState({});

    const [plan, setPlan] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successPayment, setSuccessPayment] = useState(false);
    const [formData, setFormData] = useState(null);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    let { from } = location.state || { from: { pathname: "/" } };

    const successLogin = (name, email) => {
        localStorage.setItem('userName', name);
        // localStorage.setItem('isAdmin', isAdmin);
        history.replace(from);
        history.go(0);
    }

    const onSubmit = data => {
        setSuccessPayment(true);
        setFormData(data);
        reset();
    }

    const handlePaymentSuccess = (paymentId) => {
    
        const { firstName, lastName, password, email } = formData;

        if(formData.email && formData.password){
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(res => {
                    const name = formData.firstName + ' ' + formData.lastName;
                    const newUser = { ...user };
                    newUser.displayName = name;
                    updateUserProfile(name);
                })
                .catch(function (error) {
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }

        const data = {
            category:plan,
            email:email,
            paymentId:paymentId
        }

        fetch('http://localhost:4000/addEmployer', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })        


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
            {
                <div style={{ display: formData ? 'block' : 'none' }}>
                    <ProcessPayment
                        handlePayment={handlePaymentSuccess}
                    />
                </div>
            }
            {successPayment === false &&
                <div style={{ display: formData ? 'none' : 'block' }}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <select className="select" {...register('plan', { required: true })} onChange={(event) =>
                            setPlan(event.target.options[event.target.selectedIndex].value)}>
                            <option value="">select your plan</option>
                            <option value="premium">premium</option>
                            <option value="standard">standard</option>
                            <option value="basic">basic</option>
                        </select>
                        {errors.plan && <span className="text-danger">Select a plan</span>}

                        <div className="form-group mt-2">
                            <input className="form-control" type="text" {...register("firstName", {
                                required: true
                            })}
                                placeholder="First Name"
                            />
                        </div>
                        {errors.firstName && <span className="text-danger">First Name is required</span>}

                        <div className="form-group">
                            <input className="form-control" type="text" {...register("lastName", {
                                required: true
                            })}
                                placeholder="Last Name"
                            />
                        </div>

                        {errors.lastName && <span className="text-danger">Last Name is required</span>}

                        <div className="form-group">
                            <input className="form-control" type="email" {...register("email", {
                                required: "* Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email address must be valid"
                                }
                            })}
                                placeholder="Email" />
                        </div>
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}

                        <div className="form-group">
                            <input className="form-control" type="password" {...register("password", {
                                required: "* Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must have at least 6 characters"
                                },
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter and one number digit"
                                }
                            })}
                                placeholder="Password" />
                        </div>

                        {errors.password && <p className="text-danger">{errors.password.message}</p>}

                        <div className="form-group">
                            <input className="form-control" type="password" {...register("confirmPassword", {
                                required: "* Confirmation password is required",
                                validate: value => value === password.current || "The passwords does not match"
                            })}
                                placeholder="Confirm Password" />
                        </div>
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}<br />

                        <button style={{ width: '100%' }} className="custom-btn">Sign Up</button>
                    </form>
                </div>

            }
            <h3 className="text-danger">{errorMessage}</h3>
        </div>
    );
};

export default EmployerLogin;