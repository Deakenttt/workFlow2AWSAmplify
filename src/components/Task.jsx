import React from 'react';
import '../Styles.css'; // Import the CSS file for styling

const Task = ({ task }) => {
    return (
        <div className="task-box">
            <p>{task.task}</p>
        </div>
    );
};

export default Task;