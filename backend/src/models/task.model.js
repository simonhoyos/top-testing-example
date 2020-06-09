const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'you should be logged to create a task'],
  }
}, {
  timestamps: true,
});

const Task = model('Task', taskSchema);

module.exports = Task;
