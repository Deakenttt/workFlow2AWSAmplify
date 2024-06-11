
import './App.css'

import React, { useState, useEffect } from 'react';
import Goal from './components/Goal';
import AddGoal from './components/AddGoal';
import { fetchFromAPI } from "./utils/fetchFromAPI";

const App = () => {
    const [goals, setGoals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        fetchFromAPI('goals')
        .then(data => setGoals(data))
    }, []);
    const fetchGoals = async () => {
      const data = await fetchFromAPI('goals');
      setGoals(data);
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const onUpdate = () => {
      closeModal()
      fetchGoals();
      // setIsMenuOpen(false);
      // setOpenMenus({});
    }
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };
    const clearSearch = () => {
      setSearchQuery('');
    };
    const filteredGoals = goals.filter(goal =>
      goal.goal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className='.main-background'>
        <div>
          <div className='fixed-top'>
            <h1 className="text-2xl font-bold mb-4">Goals</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                    placeholder="Search goals..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={clearSearch}
                >
                    Clear
                </button>
            </div>
            <button
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={openModal}
            >
            + Goal
            </button>
          </div>
            {isModalOpen && <AddGoal onClose={closeModal} onUpdate={onUpdate} />}
            <div className='content'>
              {filteredGoals.map((goal) => (
                  <Goal key={goal.id} goal={goal} onUpdate={onUpdate} />
              ))}
            </div>
            {/* {goals.map((goal) => (
                <Goal key={goal.id} goal={goal} onUpdate={onUpdate} />
            ))} */}
        </div>
      </div>
    );
};

export default App;
