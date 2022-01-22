import supertest from 'supertest';
import app from '../app';

const userData = {
  email: 'notVery@yahoo.com',
  password: 'testing',
};

let token: string;

describe('Test for follow feature', () => {
  test('login user', async () => {
    const response = await supertest(app).post('/users/login').send(userData);

    token = response.body.token;
    console.log(response.body);

    expect(response.status).toBe(200);
  });
});
