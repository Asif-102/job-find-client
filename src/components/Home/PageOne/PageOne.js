import React from 'react';
import { useForm } from "react-hook-form";

const PageOne = ({ setPageVisibility, setFindJobs, jobs }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        setFindJobs(data.search)
    }

    return (
        <div className="container">

            <div className="login-container text-center mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <input className="form-control" {...register("search")}
                            placeholder="Search for Job Name Keyword" />
                    </div>

                    <input type="submit" value="Search" className="btn btn-primary btn-sm" />
                </form>
            </div>

            <div className="row">
                {
                    jobs?.map(job =>
                        <div className="col-md-4 col-12 mb-3 mt-2">
                            <div className="card" style={{ width: '22rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Job Name: {job.jobName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Company Name: {job.companyName}</h6>
                                    <p className="card-text">Job Hour: {job.jobHour}</p>
                                    <a href="/applySuccess" className="card-link">Apply Job</a>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    jobs.length === 0 && <h3 className="text-center">Jobs Not Found :(</h3>
                }
            </div>

            <button className="mt-2 mb-3 btn btn-secondary btn-sm"
                onClick={() => setPageVisibility(false)}
                type="button">Go to page 2
            </button>
        </div>
    );
};

export default PageOne;