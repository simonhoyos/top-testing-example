import React from 'react';
import { render, cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import moxios from 'moxios';
import { GET_TASKS } from '../store/tasksReducer';
import Tasks from './Tasks';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const tasks = [
  { _id: '1lasdhf', name: 'task 1', done: false },
  { _id: 'sadfewt', name: 'task 2', done: true },
  { _id: 'jjhlihu', name: 'task 3', done: false },
]

describe('Tasks', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    cleanup();
    moxios.uninstall();
  });

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

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText(/No tasks created yet./)).toBeInTheDocument();
  });

  it('should request tasks on mount and dispatch GET_TASKS action', (done) => {
    const store = mockStore({
      tasksReducer: {
        tasks,
      }
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Tasks />
        </MemoryRouter>
      </Provider>
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: tasks,
      }).then(() => {
        const [action] = store.getActions();
        expect(action.type).toBe(GET_TASKS);
        expect(action.payload).toMatchObject(tasks);
        done();
      });
    })
  });
});
