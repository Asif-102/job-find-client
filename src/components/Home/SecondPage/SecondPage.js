import React, { useEffect, useState } from 'react';

const SecondPage = ({setPageVisibility, jobs}) => {

    const [allData, setAllData] = useState([]);
    let newArray = [];

    useEffect(()=>{
        fetch('https://mighty-coast-51208.herokuapp.com/allpublishJobs')
        .then(res => res.json())
        .then(data => setAllData(data))
    },[])

    for(let i= 0; i<allData.length; i++){
        let item = allData[i];
        let find = jobs.find(job => job._id == item._id);
        if(find === undefined){
            newArray.push(item)
        }
        
    }

    return (
        <div className="container">
            <div className="row">
                {
                    newArray?.map(job =>
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
                    newArray.length === 0 && <h3 className="text-center">Jobs Not Found :(</h3>
                }
            </div>
            <button className="mt-2 mb-3 btn btn-secondary btn-sm"
            onClick={()=>setPageVisibility(true)}
             type="button">Go to page 1</button>
        </div>
    );
};

export default SecondPage;