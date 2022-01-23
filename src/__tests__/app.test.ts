import supertest from 'supertest';
import app from '../app';

const userData = {
  email: 'notVery@yahoo.com',
  password: 'testing',
};

let token: string;
