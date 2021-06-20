import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm/SimpleCardForm';

const stripePromise = loadStripe('pk_test_51Ie2qDK5rzgyYeb95nlXmHtfhOglQl7Kk68509RPhDZwaBNw1EKHhkvh14l8qQil6mWNQXwB8ly6uYGOYmHojSBO00RvqDsc9w');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;