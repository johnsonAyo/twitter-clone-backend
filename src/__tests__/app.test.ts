import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Simple Test for adding two Numbers', () => {
  test('adding two numbers', async () => {
    expect(3 + 5).toBe(8);
    expect(6 + 6).toBe(12);
  });
});
