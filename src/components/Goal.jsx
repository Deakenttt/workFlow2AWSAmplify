import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask'
import UpdateGoal from './UpdateGoal';
import DeleteGoal from './DeleteGoal';
import DeleteTask from './DeleteTask';
import AIPlugIn from './AiPlugIn';
import CalTime from './CalTime';
import '../Styles.css'; // Import the CSS file for styling

const Goal = ({ goal, onUpdate }) => {
    const [showTasks, setShowTasks] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateGoalModalOpen, setIsUpdateGoalModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState("NONE");
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAIPlugInOpen, setIsAIPlugInOpen] = useState(false);
    const [isTaskEmpty, setIsTaskEmpty] = useState(true);

    let tapTimeout = null;

    const toggleTasksVisibility = () => {
        setShowTasks(!showTasks);
        closeMenu();
        if(goal.tasks.length == 0){
            setIsTaskEmpty(true);
        }else{
            setIsTaskEmpty(false);
        }
    };
    // close all the modals
    const toggleModalVisibility = () => {
        setIsModalOpen(!isModalOpen);
        closeMenu();
    };

    // if non task id put in, we set it to NONE
    const openAddTaskModal = (taskId = "NONE") => {
        setCurrentTaskId(taskId);
        setIsModalOpen(true);
        closeMenu();
    };
    const openUpdateGoalModal = () => {
        setIsUpdateGoalModalOpen(true);
        closeMenu();
    };
    const closeUpdateGoalModal = () => {
        setIsUpdateGoalModalOpen(!isUpdateGoalModalOpen);
        closeMenu();
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const openDeleteGoalModal = () => {
        setIsDeleteGoalOpen(true);
        closeMenu();
    };
    const closeDeleteGoalModal = () => {
        setIsDeleteGoalOpen(!isDeleteGoalOpen)
    };
    const toggleEditMode = () => {
        if (!showTasks) {
            setShowTasks(true);
        }
        setIsEditMode(!isEditMode);
    };
    const openAIPlugIn = () => {
        setIsAIPlugInOpen(true);
        closeMenu();
    };

    const closeAIPlugIn = () => {
        setIsAIPlugInOpen(false);
    };
    const handleDoubleClick = () => {
        setShowTasks(!showTasks);
        if(goal.tasks.length == 0){
            setIsTaskEmpty(true)
        }else{
            setIsTaskEmpty(false)
        }
    };
    const handleTouchStart = () => {
        if (tapTimeout) {
            clearTimeout(tapTimeout);
            tapTimeout = null;
            handleDoubleClick();
        } else {
            tapTimeout = setTimeout(() => {
                tapTimeout = null;
            }, 300); // 300ms for double tap
        }
    };
    return (
        // <div className="goal-container">
        <div className="goal-container p-4 border rounded-lg shadow-md" 
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleTouchStart}
        >
            {/* <div className="goal-header flex justify-between items-center"> */}
            <div className={`goal-header flex justify-between items-center ${isMenuOpen ? 'menu-open' : ''}`}>
            {/* <h2> */}
            {/* ensure smaller font size on smaller screen */}
            <div className="goal-text-container flex-1">
                <h2 className="goal-text text-base sm:text-lg md:text-xl font-bold">
                    {goal.goal}
                    {/* <span style={{ marginLeft: '10px', color: goal.state ? 'green' : 'orange' }}>
                        {goal.state ? '(Completed)' : '(Incomplete)'}
                    </span> */}
                    <span className={`ml-2 ${goal.state ? 'text-green-500' : 'text-orange-500'}`}>
                            {goal.state ? '(完成)' : '(未完成)'}
                    </span>
                </h2>
                {/* <label className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                    {goal.create_date}
                </label> */}
                <CalTime create_date={goal.create_date} />
            </div>
                {/* <div> */}
                {/* <div className="relative"> */}
                <div className="absolute top-0 right-0 mt-0 mr-0">
                    <button onClick={toggleMenu} className="p-2 text-gray-600 hover:text-black">
                        &#8942; {/* Icon for more options */}
                    </button>
                    {isMenuOpen && (
                        <div className="menu-container">
                            <div className="menu-content">
                                    <button className="menu-item text-gray-700 hover:bg-gray-100" onClick={toggleTasksVisibility}>
                                        {showTasks ? '合上目标详情' : '展开目标详情'}
                                    </button>
                                    <button className="menu-item text-gray-700 hover:bg-gray-100" onClick={toggleModalVisibility}>
                                        Add Task
                                    </button>
                                    <button className="menu-item text-gray-700 hover:bg-gray-100" onClick={openUpdateGoalModal}>
                                        Update Goal
                                    </button>
                                    <button className="menu-item text-gray-700 hover:bg-gray-100" onClick={openDeleteGoalModal}>
                                        Delete Goal
                                    </button>
                                    <button className={`menu-item hover:bg-gray-100 ${isEditMode ? 'edit-mode-active' : 'text-gray-700'}`} 
                                    onClick={toggleEditMode}>
                                    {isEditMode ? '停止更改任务' : '更改任务'}
                                    </button>
                                    {/* <button className="menu-item text-red-500 hover:bg-red-100" 
                                    onClick={openAIPlugIn}>
                                        AI Plug-in
                                    </button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showTasks && (
                isTaskEmpty ? (
                    <div className="empty-tasks-container mt-4 text-center">
                        <p className="text-gray-600">No tasks available.</p>
                    </div>
                ) : (
                // <div className="tasks-container">
                <div className={`tasks-container mt-4 ${isEditMode ? 'edit-mode' : ''}`}>
                {goal.tasks.map((task) => (
                    // he key prop is on the outer div element
                    <div key={task.id} className="task-text-container mb-2">
                        <Task task={task} />
                        <div className="task-text mt-1 task-actions">
                            {/* <p>{task.description}</p> */}
                            {isEditMode && (
                                    <>
                                        <button
                                            className="ml-1 px-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={() => openAddTaskModal(task.id)}
                                        >
                                            下方加入新任务
                                        </button>
                                        <DeleteTask taskId={task.id} onUpdate={onUpdate} />
                                    </>
                                )}
                        </div>
                    </div>
                ))}
                <div className="text-x2 font-bold">
                    <AIPlugIn 
                        goalId={goal.id} 
                        onUpdate={onUpdate}
                        onClose={closeAIPlugIn}
                    />
                </div>
                </div>
                )
            )}
            {isModalOpen && (
                <AddTask
                    goalId={goal.id}
                    taskId={currentTaskId}
                    onClose={toggleModalVisibility}
                    onUpdate={onUpdate}
                />
            )}
            {isUpdateGoalModalOpen && (
                <UpdateGoal
                    goalId={goal.id}
                    currentGoal={goal.goal}
                    currentStatus={goal.status}
                    onClose={closeUpdateGoalModal}
                    onUpdate={onUpdate}
                />
            )}
            {isDeleteGoalOpen && (
                <DeleteGoal 
                goalId={goal.id} 
                onUpdate={onUpdate} 
                onClose={closeDeleteGoalModal}
                />
            )}
            {/* {isAIPlugInOpen && (
                <AIPlugIn 
                    goalId={goal.id} 
                    onUpdate={onUpdate}
                    onClose={closeAIPlugIn}
                />
            )} */}
        </div>
    );
};

export default Goal;