import React from 'react';
import { render, cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Tasks from './Tasks';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const tasks = [
  { _id: '1lasdhf', name: 'task 1', done: false },
  { _id: 'sadfewt', name: 'task 2', done: true },
  { _id: 'jjhlihu', name: 'task 3', done: false },
]

describe('Tasks', () => {
  afterEach(cleanup);

  it('should render a list of tasks correctly', () => {
      const store = mockStore({
        tasksReducer: {
          tasks
        }
      });

      const { getAllByTestId } = render(
        <Provider store={store}>
          <Tasks />
        </Provider>
      );

      expect(getAllByTestId('task')).toHaveLength(3);
  });

  it('should render default message when tasks is empty', () => {
    const store = mockStore({
      tasksReducer: {
        tasks: [],
      }
    });

    const { getByText } = render (
      <Provider store={store}>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText(/No tasks created yet./)).toBeInTheDocument();
  })
});
