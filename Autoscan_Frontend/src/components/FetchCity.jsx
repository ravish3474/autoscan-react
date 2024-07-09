import React, { useEffect, useState } from "react";

const FetchCity = () => {
    const [data, setData] = useState(null);
    let API = "https://dog.ceo/api/breeds/image/random";

    const fetchApiData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data); // Set the fetched data to the state variable
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApiData(API);
    }, []);

    return (
        <div className="container p-5">
            <div className="row">
                <div className="card">
                    <img src={data ? data.message : "Loading..."} className="JsonDefaultImg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default FetchCity;
