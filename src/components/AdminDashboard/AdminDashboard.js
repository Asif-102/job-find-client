import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [pendingJobLists, setPendingJobLists] = useState([]);
    const [updateUi, setUpdateUi] = useState(0);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch('https://mighty-coast-51208.herokuapp.com/postedJob')
            .then(res => res.json())
            .then(data => { setPendingJobLists(data) })
    }, [updateUi])

    const changeStatus = (jobInfo) => {

        const { companyName, jobName, name, email, jobHour } = jobInfo;

        const updateData = {
            id: jobInfo._id,
            status: 'done'
        }
        fetch('https://mighty-coast-51208.herokuapp.com/updateStatus', {
            method: 'PATCH',
            body: JSON.stringify(updateData),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSuccess(true)
                setUpdateUi(updateUi + 1)
                approvedJobs(jobInfo)
            })

    }

    const approvedJobs = (jobInfo) => {
        const { companyName, jobName, name, email, jobHour } = jobInfo;

        const approvedJob = {
            companyName: companyName,
            jobName: jobName,
            name: name,
            email: email,
            jobHour: jobHour,
            status: 'done'
        }

        fetch('https://mighty-coast-51208.herokuapp.com/approvedJobs', {
            method: 'POST',
            body: JSON.stringify(approvedJob),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        })
            .then(res => res.json())
            .then(data => {
                setSuccess(false)
                console.log(data)
            })
    }

    return (
        <div className="container">
            {
                success && <p className="text-center text-success">Updated Success</p>
            }
            <ol>
                {
                    pendingJobLists.length ? pendingJobLists.map(jobs =>
                        <div className="card mb-2">
                            <p><span className="text-primary">Company Name:</span> {jobs.jobName}</p>
                            <p><span className="text-info">Job Name:</span> {jobs.jobName}</p>
                            <p>
                                <span className={`p-1 m-2 text-white ${jobs.status === 'pending' ? 'bg-danger' : 'bg-success'}`}>{jobs.status}</span>
                                <button
                                    onClick={() => changeStatus(jobs)}
                                    class="btn btn-secondary btn-sm" style={{ display: jobs.status === 'done' ? 'none' : '' }}>Change status</button>
                            </p>
                        </div>
                    ) :
                        <p>Loading...</p>
                }
            </ol>
        </div>
    );
};

export default AdminDashboard;