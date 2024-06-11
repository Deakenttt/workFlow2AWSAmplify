import React, { useState } from 'react';
import axios from 'axios';
import '../Styles.css'; // Import CSS for modal styling

const UpdateGoal = ({ goalId, currentGoal, currentStatus, onClose, onUpdate }) => {
    const [goal, setGoal] = useState(currentGoal);
    const [status, setStatus] = useState(currentStatus ? 'Finished' : 'Unfinished');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleUpdateGoal = async (e) => {
        e.preventDefault();

        if (goal.trim() === '') {
            setMessage('goal cannot be empty');
            setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
            return;
        }
        // if status = "finished, set goal.status -> true, else false"
        const statusBoolean = status === 'Finished';

        try {
            // { goal }, the 'goal' have to match up the attribute name in backend sql
            const response = await axios.put(
                `http://127.0.0.1:5000/update_goal/${goalId}`, { goal, state: statusBoolean });
            // console.log(response.data);

            if (response.status === 201 || response.status === 200) {
                setMessage('goal updated successfully!');
                onUpdate(); // Refresh the goals to include the updated goal
                setTimeout(() => {
                    setMessage('');
                    onClose();
                }, 2000);
            } else {
                setMessage('Failed to update goal');
            }
        } catch (error) {
            setMessage('Failed to update goal');
        }
        try {
            const response = await axios.put(
                `https://workflowbackendapi-production.up.railway.app/${goalId}/estamate_time`, {});
            if (response.status === 201 || response.status === 200) {
                // const data = await response.json();
                // console.log(response);
                setAIResult(response.data.estamate);
                onUpdate(); // Refresh the goals to include the updated goal
            } else {
                setError('Failed to update estimate time 1');
            }
        } catch (error) {
            setError('Failed to update estimate time 2');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content relative bg-white rounded-lg shadow-lg p-7">
            <span className="close absolute top-4 right-4" onClick={onClose}>&times;</span>
                <h3>Update goal</h3>
                {/* <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                /> */}
                <textarea
                    id="goal"
                    name="update goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-4 h-48 border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                 <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Finished">Finished</option>
                    <option value="Unfinished">Unfinish</option>
                </select>
                <button onClick={handleUpdateGoal}>Update</button>
                {/* <button onClick={onClose}>Close</button> */}
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default UpdateGoal;
