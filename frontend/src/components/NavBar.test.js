import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('should render signin and signup links when not authenticated', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(getByText('Signin')).toBeInTheDocument();
    expect(getByText('Signup')).toBeInTheDocument();
  });

  it('should render home and create links when authenticated', () => {
    localStorage.setItem('token', 'asdfasdfasdfw4rwer');

    const { getByText } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    localStorage.removeItem('token');

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Create')).toBeInTheDocument();
  });
});
