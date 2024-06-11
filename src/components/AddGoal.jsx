// components/AddGoal.jsx
import React, { useState } from 'react';
import {createGoal} from "../utils/createGoal";
import '../Styles.css'; // Import the CSS file for styling

const AddGoal = ({ onClose, onUpdate }) => {
    const [goal, setGoal] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const data = {goal}
    const handleAddGoal = async (e) => {
        e.preventDefault();
    if (!goal.trim()) {
      showMessage('Goal cannot be empty', 'error');
      return;
    }

    try {
      const response = await createGoal('create_goal', data);
      if (response.status === 201 || response.status === 200) {
        // Goal created successfully
        showMessage('Goal created successfully!', 'success');
        // do excute after pop up message
        setTimeout(() => {
            setMessage(''); // Clear the message after 2 seconds
            onUpdate();    // Add new goal to UI
            setGoal(''); // Clear the input field
          }, 2000);
      } else {
        showMessage('Goal creation failed: Goal repeated', 'error');
      }
    } catch (error) {
      console.error('Error creating goal:', error.message);
      showMessage('Network error occurred. Please try again.', 'error');
      }
    };
    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds

    };

    return (
        <div className="modal">
        {/* <div className="modal-content"> */}
        <div className="modal-content relative bg-white rounded-lg shadow-lg p-7">
            {message && (
            <div className={`warning ${messageType}`}>
            {message}
            </div>
            )}
            <span className="close absolute top-4 right-4" onClick={onClose}>&times;</span>
            <h3>加入新目标</h3>
            {/* <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Enter goal"
            /> */}
            {/* bigger text input (writing) box */}
            <textarea
              id="goal"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter goal"
              className="w-full p-4 h-48 border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button onClick={handleAddGoal}>加入目标</button>
        </div>
    </div>
    );
};

export default AddGoal;