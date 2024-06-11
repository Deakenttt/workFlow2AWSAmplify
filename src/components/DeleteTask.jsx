import React, { useState } from 'react';
import axios from 'axios';
import '../Styles.css'; // Import CSS for modal styling

const DeleteTask = ({ taskId, onUpdate }) => {
    const [message, setMessage] = useState('');
    const handleDeleteTask = async () => {
        try {
            const response = await 
            axios.delete(`https://workflowbackendapi-production.up.railway.app//delete_task/${taskId}`);

            if (response.status === 200) {
                setMessage('成功删除此任务!');
                onUpdate(); // Refresh the tasks list after deletion
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            } else {
                setMessage('无法删除此任务');
            }
        } catch (error) {
            setMessage('无法删除此任务');
        }
    };

    return (
        <>
            <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" 
            onClick={handleDeleteTask}>
                删除此任务
            </button>
            {message && <p>{message}</p>}
        </>
    );
};

export default DeleteTask;