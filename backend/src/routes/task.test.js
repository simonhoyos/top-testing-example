const req = require('supertest');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const app = require('../app');

describe('task', () => {
  let token;

  beforeEach(async () => {
    for(let collection in mongoose.connection.collections) {
      await mongoose.connection.collections[collection].deleteMany({});
    }

    const user = { email: 'test@test.com', password: '12345' };
    const auth = await req(app).post('/signup').send(user);
    token = auth.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get users tasks', async done => {
    const res = await req(app).get('/tasks').set('Authorization', token);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it('should create a new task', async done => {
    const task = { name: 'task 1' };
    const res = await req(app).post('/tasks').send(task).set('Authorization', token);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch('task 1');
  });

  it('should update an existing task', async done => {
    const task = await req(app).post('/tasks').send({ name: 'task 1' }).set('Authorization', token);
    const res = await req(app).put(`/tasks/${task.body._id}`).set('Authorization', token);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch('task 1');
    expect(res.body.done).toBeTruthy();
  });

  it('should delete an existing task', async done => {
    const task = await req(app).post('/tasks').send({ name: 'task 1' }).set('Authorization', token);
    const res = await req(app).delete(`/tasks/${task.body._id}`).set('Authorization', token);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/task deleted/i);
  });
})
