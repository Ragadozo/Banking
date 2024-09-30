import './App.css';
import InvoiceTab from './components/InvoiceTab/InvoiceTab';

import React, { useEffect, useState } from 'react';
function App() {
  const [invoices, setInvoices] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data'); // Make a GET request to Flask API
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON data
        console.log(data)
        setInvoices(data); // Update users state
      } catch (err) {
        setError(err.message); // Update error state
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchData(); // Invoke the data fetching function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Conditional rendering based on state
  if (loading) {
    return <div className="App"><h2>Loading data...</h2></div>;
  }

  if (error) {
    return <div className="App"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="App">
      <h1>User Invoices</h1>
      {invoices && invoices.length > 0  ? (
        <InvoiceTab invoices={invoices} />
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
}

export default App;
