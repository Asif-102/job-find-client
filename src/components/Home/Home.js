import React, { useEffect, useState } from 'react';
import PageOne from './PageOne/PageOne';
import SecondPage from './SecondPage/SecondPage';

const Home = () => {

    const [jobs, setJobs] = useState([]);
    const [findJobs, setFindJobs] = useState('');
    const [pageVisibility, setPageVisibility] = useState(true)

    useEffect(() => {
        fetch('https://mighty-coast-51208.herokuapp.com/publishedJobs?search=' + findJobs)
            .then(res => res.json())
            .then(data => {
                if(data.length > 6){
                    const newData = data.splice(0,6)
                    setJobs(newData)
                }else{
                    setJobs(data)
                }
            })
    }, [findJobs])


    return (
        <div>
            <span style={{display:pageVisibility?'':'none'}}>
                <PageOne setPageVisibility={setPageVisibility} jobs={jobs} setFindJobs={setFindJobs}/>
            </span>
            <span style={{display:pageVisibility?'none':''}}>
                <SecondPage setPageVisibility={setPageVisibility} jobs={jobs}/>
            </span>
        </div>
    );
};

export default Home;