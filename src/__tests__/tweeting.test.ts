import request from 'supertest';
import app from '../app';

let emailToken: string;
let token: string;

describe('Auth', () => {
  const userData = {
    firstName: 'Tolu',
    lastName: 'Johnson',
    email: 'tolz@yahoo.com',
    password: 'testing',
  };

  test('signup', async () => {
    const response = await request(app).post('/users/signup').send(userData);

    emailToken = response.body.emailToken;

    expect(response.status).toBe(200);
    expect(response.body.newUser.isActive).toBe(false);
  });

  test('confirmEmail', async () => {
    const response = await request(app).get(`/users/verify/${emailToken}`);

    expect(response.status).toBe(201);
    expect(response.body.emailToken.email).toEqual(response.body.data.email);
    expect(response.body.data.isActive).toBe(true);
  });

  test('login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ email: userData.email, password: userData.password });

    token = response.body.token;

    expect(response.status).toBe(201);
    expect(response.body.user.isActive).toBe(true);
  });
});

/**************************************************************************|
| Test that handle  tweet, retweet operation by a login user              *|
 /**************************************************************************/

describe('Tweet by authorised user', () => {
  const newData = {
    userId: '61e5ba1ca9dd9f3f16df5389',
    messageBody: 'Message here',
    tweetImage: 'cloudImage.secure_url here',
    whoCanReply: 'Everyone',
    cloudinary_id: 'cloudImage.public_id here',
  };

  // check if a user is not authorised
  it(' Authorised user for tweeting', async () => {
    const res = await request(app)
      .post('/tweet/')
      .set(`Authorization`, `Bearer ${token}`)
      .send(newData);
    expect(res.status).toBe(200);
  });

  // All user tweet

  it(' A user can view all his tweet', async () => {
    const res = await request(app).get('/tweet/alltweet').set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  // a user can view all his retweet

  it(' A user can view all his retweet', async () => {
    const res = await request(app).get('/tweet/allretweet').set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  //retweet a tweet
  it(' Retweet a tweet using valid tweet id', async () => {
    const res = await request(app)
      .post('/tweet/retweet/61e6c6ef532239cbd186ac4f')
      .set(`Authorization`, `Bearer ${token}`)
      .send(newData);

    expect(res.status).toBe(201);
    expect(res.body.msg).toBe('Retweet created....');
  });

  //return 404 error if tweet id you want to retweet is invalid

  it(' Return 404 error during retweet using invalid tweet id,', async () => {
    const res = await request(app)
      .post('/tweet/retweet/1')
      .set(`Authorization`, `Bearer ${token}`)
      .send(newData);

    expect(res.status).toBe(404);
  });

  // delete a tweet using a valid tweet id

  it(' return 404 if id is not available for delete', async () => {
    const res = await request(app)
      .delete('/tweet/deletetweet/61e6c6ef532239cbd186ac4f')

      .set(`Authorization`, `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});
