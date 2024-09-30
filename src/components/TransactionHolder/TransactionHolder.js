
import React, { useState } from 'react';
import './TransactionHolder.css';  // You can add styling in this CSS file

const TransactionHolder = ({ transaction, onClose, onSave }) => {
  const [editableValue, setEditableValue] = useState(0);
  const maxEditableValue = transaction.amount - transaction.paid_amount;

  const handleInputChange = (e) => {
    let value = parseFloat(e.target.value);

    // Ensure the value is within the allowed range
    if (isNaN(value)) value = 0; // If it's not a number, set it to 0
    if (value < 0) value = 0; // Minimum value of 0
    if (value > maxEditableValue) value = maxEditableValue; // Maximum allowed value
    setEditableValue(value);
  };

  const handleSubmit = () => {
    // Create the updated item with the new paid amount
    const updatedTransaction = { reference: transaction.reference, paid_amount: editableValue + transaction.paid_amount };
    onSave(updatedTransaction);  // Call the onSave function with the updated data
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Pay transaction</h2>
        <div>Reference: {transaction.reference}</div>
        <div>Amount: {transaction.amount}</div>
        {transaction.status !== "PAID" ?
          <form onSubmit={handleSubmit}>
            <label>Enter Amount Paid (Max: {maxEditableValue}):</label>
            <div>

              <input
                type="number"
                value={editableValue}
                onChange={handleInputChange}
                min="0"
                max={maxEditableValue}
              />
            </div>
            <div>Already paid Amount: {transaction.paid_amount}</div>
            <div >
              <button type="submit" className='submit-buttons'>Save</button>
              <button type="button" className='submit-buttons' onClick={onClose}>Cancel</button>
            </div>
          </form>
          :
          <div>
            <div>{transaction.status}</div>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        }
      </div>
    </div>
  );
};


export default TransactionHolder;