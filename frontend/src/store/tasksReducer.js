import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_NAME = 'CHANGE_NAME';

export function getTasks() {
  return async function (dispatch) {
    const token = localStorage.getItem('token');
    const { data } = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/tasks',
      headers: {
        'Authorization': token
      },
    });

    dispatch({
      type: GET_TASKS,
      payload: data,
    });
  }
}

export function createTask(data) {
  return async function (dispatch) {
    const token = localStorage.getItem('token');
    await axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: '/tasks',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      data,
    });

    dispatch({
      type: CREATE_TASK,
      payload: 'Task created successfully',
    });
  }
}

export function completeTask(id) {
  return async function (dispatch) {
    const token = localStorage.getItem('token');
    const { data } = await axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/tasks/${id}`,
      headers: {
        'Authorization': token,
      },
    });

    dispatch({
      type: COMPLETE_TASK,
      payload: data,
    });
  }
}

export function deleteTask(id) {
  return async function (dispatch) {
    const token = localStorage.getItem('token');
    await axios({
      method: 'DELETE',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/tasks/${id}`,
      headers: {
        'Authorization': token,
      },
    });

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  }
}

export function handleChange({ target: { value } }) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_NAME,
      payload: value,
    })
  }
}

export const initialState = {
  tasks: [],
  name: '',
  message: '',
};

export function tasksReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        name: '',
        message: payload,
      };
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          return task._id === payload._id ? payload : task
        }),
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(({ _id }) => _id !== payload),
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: payload,
      };
    default:
      return state;
  }
}
