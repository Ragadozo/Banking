import React, { useState } from 'react';
import './InvoiceTab.css';  // You can add styling in this CSS file
import TransactionHolder from '../TransactionHolder/TransactionHolder';

const InvoiceTab = ({ invoices }) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  const handleSave = async (updatedTransaction) => {
    console.log('Successfully updated item:');
    fetch('/api/update-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

    return (
      <div className="tab-container">
        {invoices.map((invoice, index) => (
          <div className={`box ${invoice.status}`} key={index} onClick={() => handleItemClick(invoice)}>
          <h3>Reference: {invoice.reference}</h3>
          <p>Amount: {invoice.amount}</p>
          <p>Paid Amount: {invoice.paid_amount}</p>
          <p>Status: {invoice.status}</p>
          <p>Created At: {new Date(invoice.created_at).toLocaleString()}</p>
          <p>Due Date: {new Date(invoice.due_date).toLocaleString()}</p>
        </div>
        ))}
        {selectedItem && (
          <TransactionHolder 
            transaction={selectedItem} 
            onClose={handleModalClose} 
            onSave={handleSave} 
          />
        )}
      </div>
    );
  };

export default InvoiceTab;