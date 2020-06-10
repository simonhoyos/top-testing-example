import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import moxios from 'moxios';
import { DELETE_TASK, COMPLETE_TASK } from '../store/tasksReducer';
import Task from './Task';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Task', () => {
  beforeEach(() => moxios.install());

  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  it('should show completed task when done', () => {
    const store = mockStore();

    const { getByTestId } = render(
      <Provider store={store}>
        <Task id="sdafsd" name="task 1" done={true} />
      </Provider>
    );

    expect(getByTestId('task-status')).toHaveTextContent('Completed');
  });

  it('should show uncompleted task when not done', () => {
    const store = mockStore();

    const { getByTestId } = render(
      <Provider store={store}>
        <Task id="sdafsd" name="task 1" done={false} />
      </Provider>
    );

    expect(getByTestId('task-status')).toHaveTextContent('Uncompleted');
  });

  it('should delete task and dispatch DELETE_TASK action', (done) => {
    const store = mockStore();

    const { getByTestId } = render(
      <Provider store={store}>
        <Task id="sdafsd" name="task 1" done={false} />
      </Provider>
    );

    fireEvent.click(getByTestId('task-delete'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      }).then(() => {
        const [action] = store.getActions();
        expect(action.type).toBe(DELETE_TASK);
        expect(action.payload).toBe('sdafsd');
        done();
      })
    });
  });

  it('should complete task and dispatch COMPLETE_TASK action', (done) => {
    const task = {
      id: 'sdafd',
      name: 'task 1',
      done: true,
    };

    const store = mockStore();

    const { getByTestId } = render(
      <Provider store={store}>
        <Task id="safdasdf" name="task 1" done={false} />
      </Provider>
    );

    fireEvent.click(getByTestId('task-complete'));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: task,
      }).then(() => {
        const [action] = store.getActions();
        expect(action.type).toBe(COMPLETE_TASK);
        expect(action.payload).toMatchObject(task);
        done();
      })
    })
  })
})
