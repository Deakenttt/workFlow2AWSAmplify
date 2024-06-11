import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const DeleteGoal = ({ goalId, onUpdate, onClose}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleDeleteGoal = async (e) => {
        //we don't need to cancel the default action that belongs to the event
        // e.preventDefault();
        try {
            const response = await axios.delete(`https://workflowbackendapi-production.up.railway.app/delete_goal/${goalId}`);

            if (response.status === 200) {
                setMessage('Goal deleted successfully!');
                onUpdate(); // Refresh the goals list after deletion
                setTimeout(() => {
                    setMessage('');
                    setIsModalOpen(false);
                }, 2000);
            } else {
                setMessage('Failed to delete goal');
            }
        } catch (error) {
            setMessage('Failed to delete goal');
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
        // when button click close the menu in Goal

    };

    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const confirmDelete = () => {
        handleDeleteGoal();
    };
    return (
        <>
            {/* <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={openModal}>
                Delete Goal
            </button>
            {isModalOpen && ( */}
                <div className="modal fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this goal?</p>
                        <div className="mt-4 flex justify-end"></div>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2" onClick={
                            confirmDelete}>Yes</button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={
                            onClose}>No</button>
                        {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
                    </div>
                </div>
            {/* )} */}
        </>
    );
};

export default DeleteGoal;
