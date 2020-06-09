import React from 'react';
import { connect } from 'react-redux';
import { completeTask, deleteTask } from '../store/tasksReducer';

function Task({
  id,
  name,
  done,
  completeTask,
  deleteTask
}) {
  function handleComplete() {
    completeTask(id);
  }

  function handleDelete() {
    deleteTask(id);
  }

  return (
    <div className="task" data-testid="task">
      <h2>{name}</h2>
      <p data-testid="task-status">{done ? 'Completed' : 'Uncompleted'}</p>
      <button
        type="button"
        onClick={handleComplete}
      >
        Mark as {done ? 'Uncompleted' : 'Completed'}
      </button>
      <button
        type="button"
        onClick={handleDelete}
      >
        Delete task
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  completeTask,
  deleteTask,
};

export default connect(null, mapDispatchToProps)(Task);
