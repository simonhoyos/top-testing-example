const req = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../app');

describe('user', () => {
  beforeEach(async () => {
    for(let collection in mongoose.connection.collections) {
      await mongoose.connection.collections[collection].deleteMany({});
    }

    const users = await mongoose.models.User.find();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should signup a new user', async done => {
    const user = { email: 'test@test.com', password: '12345' };
    const res = await req(app).post('/signup').send(user);
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('shouldn\'t signup a new user if email already exists', async done => {
    const user = { email: 'test@test.com', password: '12345' };
    await mongoose.models.User.create(user);
    const res = await req(app).post('/signup').send(user);
    done();

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email already exists/);
  })

  it('shouldn\'t signin an user if invalid password', async done => {
    const password = await bcrypt.hash('12345', 8);
    const user = { email: 'test4@test.com', password };
    await mongoose.models.User.create(user);

    const res = await req(app).post('/signin').send({
      email: 'test@test.com',
      password: '13456',
    });
    done();

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch('Invalid email or password');
  });

  it('shouldn\'t signin an user if invalid email', async done => {
    const password = await bcrypt.hash('12345', 8);
    const user = { email: 'test@test.com', password };
    await mongoose.models.User.create(user);

    const res = await req(app).post('/signin').send({
      email: 'test1@test.com',
      password: '12345',
    });
    done();

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch('Invalid email or password');
  });

  it('should signin an user', async done => {
    const password = await bcrypt.hash('12345', 8);
    const user = { email: 'test@test.com', password };
    await mongoose.models.User.create(user);

    const res = await req(app).post('/signin').send({
      email: 'test@test.com',
      password: '12345',
    });
    done();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
})
