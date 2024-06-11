import React from 'react';
import { render } from '@testing-library/react';
import CalTime from '../src/components/CalTime';

describe('Goal component', () => {
    test('calculateTimePassed function', () => {
        const createDate = new Date('2024-06-01T12:00:00'); // Example creation date
        const currentTime = new Date('2024-06-01T14:30:00'); // Example current time
        // const create_date = createDate.toISOString();
        
        const { getByText } = render(< CalTime create_date={createDate} />);
        
        // Assert that the label with calculated time passed is present in the component
        expect(getByText('2 hours and 30 minutes ago')).toBeInTheDocument();
    });
});