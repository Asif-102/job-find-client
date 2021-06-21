import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const EmployerDashboard = () => {

    const category = localStorage.getItem("accountCategory");
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    const [previousPost, setPreviousPost] = useState([]);
    const [postedHourCount, setPostedHourCount] = useState(0);

    const [success, setSuccess] = useState('');

    const [updateData, setUpdateData] = useState(0);

    useEffect(() => {
        fetch(`https://mighty-coast-51208.herokuapp.com/findEmployerPost?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setPreviousPost(data)
                postedHour(data)
            })
    }, [email, updateData])

    

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const postedHour = (all) => {
        let count = 0;
        for (let i = 0; i < all.length; i++) {
            let hour = all[i].jobHour;
            count = count + parseInt(hour);
        }
        setPostedHourCount(count);
    }

    let hourLimit = 0;

    if (category === 'premium') {
        hourLimit = 10;
    }
    else if (category === 'standard') {
        hourLimit = 20
    }
    else {
        hourLimit = 30
    }

    const onSubmit = data => {
        const { name, companyName, jobName, jobHour } = data;

        if (previousPost.length === 0) {
            if (jobHour > hourLimit) {
                alert("Your Job Hour limit crossed");
            }
            else {

                const job = {
                    name: name,
                    companyName: companyName,
                    jobName: jobName,
                    jobHour: jobHour,
                    email: email,
                    status: 'pending'
                }

                fetch('https://mighty-coast-51208.herokuapp.com/jobPost', {
                    method: 'POST',
                    body: JSON.stringify(job),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setSuccess('Job Posted')
                        setUpdateData(updateData + 1)
                        reset()
                    })
            }
        }
        else if (previousPost.length > 0) {
            if ((postedHourCount + parseInt(jobHour)) > hourLimit) {
                alert("Your Job Hour limit crossed");
            }
            else {

                const job = {
                    name: name,
                    companyName: companyName,
                    jobName: jobName,
                    jobHour: jobHour,
                    email: email,
                    status: 'pending'
                }

                fetch('https://mighty-coast-51208.herokuapp.com/jobPost', {
                    method: 'POST',
                    body: JSON.stringify(job),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setSuccess('Job Posted')
                        setUpdateData(updateData + 1)
                        reset()
                    })
            }
        }
    }

    return (
        <div className="login-container text-center mt-5">
            <p className="text-warning">This month you have Left <span className="text-dark">{hourLimit - postedHourCount}</span> hours job post  from your <span className="text-dark">{hourLimit}</span> hours job post limit</p>
            <br />
            <h3>Post a Job</h3>

            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="form-group mt-2">
                    <input className="form-control" type="text" {...register("name", {
                        required: true
                    })}
                        defaultValue={userName?userName.split(" ")[0]:""}
                        placeholder="Your Name"
                    />
                </div>
                {errors.name && <span className="text-danger">First Name is required</span>}

                <div className="form-group mt-2">
                    <input className="form-control" type="text" {...register("companyName", {
                        required: true
                    })}
                        onChange={() => setSuccess('')}
                        placeholder="Company Name"
                    />
                </div>
                {errors.companyName && <span className="text-danger">Company Name is required</span>}

                <div className="form-group mt-2">
                    <input className="form-control" type="text" {...register("jobName", {
                        required: true
                    })}
                        onChange={() => setSuccess('')}
                        placeholder="Job Name"
                    />
                </div>
                {errors.jobName && <span className="text-danger">Job Name is required</span>}

                <div className="form-group mt-2">
                    <input className="form-control" type="number" {...register("jobHour", {
                        required: true
                    })}
                        onChange={() => setSuccess('')}
                        placeholder="Job Hour"
                    />
                </div>
                {errors.jobHour && <span className="text-danger">Job Hour is required</span>}

                <button style={{ width: '100%' }} className="custom-btn">Post</button>
            </form>

            <p className="text-success">{success}</p>

        </div>
    );
};

export default EmployerDashboard;