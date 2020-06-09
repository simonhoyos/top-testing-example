import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  GET_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  CHANGE_NAME,
  getTasks,
  createTask,
  completeTask,
  initialState,
  tasksReducer,
} from './tasksReducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const tasks = [
  { _id: 'asdfdsaf', name: 'task 1', done: false },
  { _id: 'fhfghgjk', name: 'task 2', done: true },
  { _id: 'ytregfvh', name: 'task 3', done: false },
];

describe('taskReducer', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  it(
    'should request tasks and dispatch GET_TASKS action with payload',
    (done) => {
      const { dispatch, getActions } = mockStore();

      getTasks()(dispatch);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: tasks,
        }).then(() => {
          const actions = getActions();
          expect(actions[0].type).toBe(GET_TASKS);
          expect(actions[0].payload).toMatchObject(tasks)
          done();
        });
      });
    }
  );

  it(
    'should create task and dispatch CREATE_TASK action with payload',
    (done) => {
      const { dispatch, getActions } = mockStore();

      createTask({ name: 'task 1' })(dispatch);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        }).then(() => {
          const [action] = getActions();
          expect(action.type).toBe(CREATE_TASK);
          expect(action.payload).toMatch(/successfully/);
          done();
        })
      })
    }
  );

  it(
    'should complete task and dispatch COMPLETE_TASK action with payload',
    (done) => {
      const { dispatch, getActions } = mockStore();

      completeTask('sdfsad')(dispatch);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: tasks[0]
        }).then(() => {
          const [action] = getActions();
          expect(action.type).toBe(COMPLETE_TASK);
          expect(action.payload).toMatchObject(tasks[0]);
          done();
        });
      })
    }
  );

  it('should return initial state by default', () => {
    const state = tasksReducer(undefined, { type: 'invalid' });

    expect(state).toMatchObject(initialState);
  });

  it('should add tasks when GET_TASKS action is dispatched', () => {
    const state = tasksReducer(undefined, { type: GET_TASKS, payload: tasks });

    expect(state).toMatchObject({ ...initialState, tasks })
  });

  it('should change name when CHANGE_NAME action is dispatched', () => {
    const state = tasksReducer(undefined, { type: CHANGE_NAME, payload: 'task 1'});

    expect(state.name).toBe('task 1');
  })
});
