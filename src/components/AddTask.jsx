import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import '../Styles.css'; // Import CSS for modal styling

const AddTask = ({ goalId, taskId = "NONE", onClose, onUpdate }) => {
    const [task, setTask] = useState('');
    const [message, setMessage] = useState('');

    const handleAddTask = async () => {
        if (task.trim() === '') {
            setMessage('Task cannot be empty');
            setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
            return;
        }

        try {
            // user decide to generally add Task OR add Task after sepecific Task id
            const url = taskId !== "NONE" 
                ? `${BASE_URL}/task_create_after/${taskId}`
                : `${BASE_URL}/${goalId}/create_task`;
            const response = await axios.post(url, { task });

            if (response.status === 201 || response.status === 200) {
                setMessage('Task added successfully!');
                onUpdate(); // Refresh the goals to include the new task
                setTimeout(() => {
                    setMessage('');
                    onClose();
                }, 2000);
            } else {
                setMessage('Failed to add task');
            }
        } catch (error) {
            setMessage('Failed to add task');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content relative bg-white rounded-lg shadow-lg p-7">
            {/* a close icon instead of close button */}
            <span className="close absolute top-4 right-4" onClick={onClose}>&times;</span>
                <h3>加入新任务</h3>
                <textarea
                    id="task"
                    name="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                    className="w-full p-4 h-48 border border-gray-300 rounded-lg 
                    shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button onClick={handleAddTask}>加入任务</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AddTask;