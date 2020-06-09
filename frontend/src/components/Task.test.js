import React from 'react';
import { render, cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Task from './Task';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Task', () => {
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
})
