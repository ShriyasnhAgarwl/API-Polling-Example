import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobStatusPoller = ({ jobId }) => {
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState(null);
  const interval = 5000; // polling interval in milliseconds

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        const response = await axios.get(`https://api.example.com/job-status/${jobId}`);
        setStatus(response.data.status);
      } catch (err) {
        setError('Failed to fetch job status');
      }
    };

    const polling = setInterval(() => {
      fetchJobStatus();
    }, interval);

    // Fetch status once immediately
    fetchJobStatus();

    // Cleanup interval on component unmount
    return () => clearInterval(polling);
  }, [jobId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Job Status: {status}</h1>
      {status === 'complete' && <p>Job completed successfully!</p>}
    </div>
  );
};

export default JobStatusPoller;
