import React from 'react';
import { render } from '@testing-library/react';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  it('should render correctly', () => {
    const { container } = render(<UserForm />);

    expect(container.firstChild).toMatchSnapshot();
  });
})
