// src/DataFetcher.js
import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Data Fetcher Component</h2>
            {data ? (
                <div>
                    <h3>Title: {data.title}</h3>
                    <p>Body: {data.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default DataFetcher;
