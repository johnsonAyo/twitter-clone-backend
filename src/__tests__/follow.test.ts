import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Simple Test for adding two Numbers', () => {
  test('adding two numbers', async () => {
    expect(3 + 5).toBe(8);
    expect(6 + 6).toBe(12);
  });
});

describe('authors', () => {
  const authorData = {
    author: 'Hannah Montanna',
    age: 32,
    address: '7, Straight Street, Walls',
  };

  test('follow user test', async () => {
    const response = await supertest(app)
      .post('/api/follow')
      // .set("Authorization", `Bearer ${token}`)
      .send(authorData);
    // authorId = response.body.data.id;
    // ID = response.body.data.id;
    //console.log(response.body.message,ID, 'CHIIDFJDFDFJD')
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('creates new author');
    expect(response.body.data.author).toBe(authorData.author);
  });
});
