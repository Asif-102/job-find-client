import React from 'react';
import { useHistory } from "react-router-dom";

const AccountType = () => {

    let history = useHistory();

    function handleClick(path) {
        history.push(`/${path}`);
    }

    return (
        <div className="container text-center">
            <h3>Select Your Account Type</h3>
            <br />
            <button
            onClick={()=>handleClick('employer')} 
            type="button" class="btn btn-primary">Employer</button>
            <br />
            <hr />
            <button 
            onClick={()=>handleClick('jobSeeker')}
            type="button" class="btn btn-info">Job Seeker</button>
        </div>
    );
};

export default AccountType;