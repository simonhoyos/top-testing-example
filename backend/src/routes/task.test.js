const req = require('supertest');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const app = require('../app');

describe('task', () => {
  beforeEach(async () => {
    for(let collection in mongoose.connection.collections) {
      await mongoose.connection.collections[collection].deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get users tasks', async done => {
    const user = { email: 'test@test.com', password: '12345' };
    const auth = await req(app).post('/signup').send(user);
    const token = auth.body.token;

    const res = await req(app).get('/tasks').set('Authorization', token);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });
})
