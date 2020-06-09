import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('should render correctly', () => {
    const { container } = render(<TaskForm />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should change input value', () => {
    const handleChange = jest.fn();
    const event = {
      target: {
        name: 'name',
        value: 'value',
      },
    };
    const { getByLabelText } = render(<TaskForm handleChange={handleChange} />);

    const input = getByLabelText('Name');

    fireEvent.change(input, event);

    expect(handleChange).toHaveBeenCalled();
  });
})
