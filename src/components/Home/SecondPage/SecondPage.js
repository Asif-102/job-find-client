import React, { useEffect, useState } from 'react';

const SecondPage = ({setPageVisibility, jobs}) => {

    const [allData, setAllData] = useState([]);
    let newArray = [];

    useEffect(()=>{
        fetch('https://mighty-coast-51208.herokuapp.com/allpublishJobs')
        .then(res => res.json())
        .then(data => setAllData(data))
    },[])

    console.log(allData);

    for(let i= 0; i<allData.length; i++){
        let item = allData[i];
        let found = jobs.filter(get => get._id == item.id)
        console.log(found);
    }

    return (
        <div>
            <h1>This is page 2</h1>
            <button
            onClick={()=>setPageVisibility(true)}
             type="button" class="btn btn-secondary btn-sm">Go to page 1</button>
        </div>
    );
};

export default SecondPage;