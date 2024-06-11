import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles.css'; // Import the CSS file for styling

const AIPlugIn = ({ goalId, onUpdate }) => {
    const [aiResult, setAIResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const estimateTime = async () => {
            try {
                const response = await axios.put(`https://workflowbackendapi-production.up.railway.app/${goalId}/estamate_time`, {});
                if (response.status === 201 || response.status === 200) {
                    // const data = await response.json();
                    // console.log(response);
                    console.log("estimate time every time user click show task");
                    setAIResult(response.data.estamate);
                    // onUpdate(); // Refresh the goals to include the updated goal
                } else {
                    setError('Failed to update estimate time 1');
                }
            } catch (error) {
                setError('Failed to update estimate time 2');
            } finally {
                setLoading(false);
            }
        };
        estimateTime();
    }, [goalId]);

    const toggleShowResult = () => {
        setShowResult(!showResult);
    };

    if (loading) return <div>AI estimating...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ai-plugin-modal">
            {/* <button onClick={onClose} className="close-button">Close</button> */}
            <button onClick={toggleShowResult} className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {showResult ? 'Hide Result' : 'Show AI estiamte time'}
            </button>
            {showResult && (
                <div>
                    {/* <h2>AI Result for Goal ID: {goalId}</h2> */}
                    <div className="task-box mt-1">
                        {/* <pre>{JSON.stringify(aiResult, null, 2)}</pre> */}
                        {aiResult}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIPlugIn;