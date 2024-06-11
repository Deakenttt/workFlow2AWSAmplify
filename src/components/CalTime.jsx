import React, { useState, useEffect } from 'react';

const CalTime = ({ create_date }) => {
    // State variables and other code here...

    const [timePassed, setTimePassed] = useState('');
    const [tagColor, setagColor] = useState('bg-gray-200');

    useEffect(() => {
        const calculateTimePassed = () => {
            const createDate = new Date(create_date);
            const currentTime = new Date();
            // const timeDifference = currentTime - createDate;
            const timeDifference = createDate - currentTime;
            // console.log(timeDifference);
            const secondsPassed = Math.abs(Math.floor(timeDifference / 1000)); // Use Math.abs to ensure positive value

            if (secondsPassed < 60) {
                // setTimePassed(`${secondsPassed} seconds ago`);
                setTimePassed(`${secondsPassed} second${secondsPassed !== 1 ? 's' : ''} ago`);
            } else if (secondsPassed < 3600) {
                const minutesPassed = Math.floor(secondsPassed / 60);
                // setTimePassed(`${minutesPassed} minutes ago`);
                setTimePassed(`${minutesPassed} minute${minutesPassed !== 1 ? 's' : ''} ago`)
            } else if (secondsPassed < 86400) {
                const hoursPassed = Math.floor(secondsPassed / 3600);
                const remainingMinutes = Math.ceil((secondsPassed % 3600) / 60);
                // setTimePassed(`${hoursPassed} hours and ${remainingMinutes} minutes ago`);
                setTimePassed(`${hoursPassed} hour${hoursPassed !== 1 ? 's' : ''} 
                and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} ago`);
            } else if (secondsPassed < 2592000) {
                const daysPassed = Math.floor(secondsPassed / 86400);
                const remainingHours = Math.ceil((secondsPassed % 86400) / 3600);
                if (daysPassed >= 1) {
                    setagColor('bg-amber-200')
                }else if(daysPassed >= 3){
                    setagColor('amber-400')
                }else if(daysPassed >= 6){
                    setagColor('bg-amber-600')
                }else if (daysPassed >= 7) {
                    setagColor('bg-orange-200')
                }else if(daysPassed >= 13){
                    setagColor('bg-orange-400')
                }else if(daysPassed >= 20){
                    setagColor('bg-orange-600')
                }else{
                    setagColor('bg-orange-700')
                }
                // setTimePassed(`${daysPassed} days and ${remainingHours} hours ago`);
                setTimePassed(`${daysPassed} day${daysPassed !== 1 ? 's' : ''} 
                and ${remainingHours} hour${remainingHours !== 1 ? 's' : ''} ago`);
            } else if (secondsPassed < 31536000) {
                const monthsPassed = Math.floor(secondsPassed / 2592000);
                const remainingDays = Math.ceil((secondsPassed % 2592000) / 86400);
                // setTimePassed(`${monthsPassed} months and ${remainingDays} days ago`);
                setTimePassed(`${monthsPassed} month${monthsPassed !== 1 ? 's' : ''} 
                and ${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago`);
            } else {
                const yearsPassed = Math.floor(secondsPassed / 31536000);
                const remainingMonths = Math.ceil((secondsPassed % 31536000) / 2592000);
                // setTimePassed(`${yearsPassed} years and ${remainingMonths} months ago`);
                setTimePassed(`${yearsPassed} year${yearsPassed !== 1 ? 's' : ''} 
                and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''} ago`);
            }
        };

        calculateTimePassed();

        // Update time every minute
        const interval = setInterval(calculateTimePassed, 60000);

        return () => clearInterval(interval);
    }, [create_date]);

    return (
        <>
            {/* Other components and JSX here */}
            {/* <label className={`inline-block px-2 py-1 bg-amber-300 text-gray-600 text-xs font-semibold rounded-full`}> */}
            <label className={`inline-block px-2 py-1 ${tagColor} text-gray-600 text-xs font-semibold rounded-full`}>
                {timePassed}
            </label>
        </>
    );
};

export default CalTime;