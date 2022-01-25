import supertest from 'supertest';
import app from '../app';

let emailToken: string;
let token: string;

describe('Auth', () => {
  const userData = {
    firstName: 'Ewa',
    lastName: 'olamide',
    email: 'tolc@yahoo.com',
    password: 'testing',
  };

  test('signup', async () => {
    const response = await supertest(app).post('/users/signup').send(userData);

    emailToken = response.body.emailToken;

    expect(response.status).toBe(200);
    expect(response.body.newUser.isActive).toBe(false);
  });

  test('confirmEmail', async () => {
    const response = await supertest(app).get(`/users/verify/${emailToken}`);

    expect(response.status).toBe(201);
    expect(response.body.emailToken.email).toEqual(response.body.data.email);
    expect(response.body.data.isActive).toBe(true);
  });

  test('login', async () => {
    const response = await supertest(app)
      .post('/users/login')
      .send({ email: userData.email, password: userData.password });

    token = response.body.token;

    expect(response.status).toBe(201);
    expect(response.body.user.isActive).toBe(true);
  });
});

describe('profile', ()=>{
    const ProfileData = {
        firstName: "Ewa",
        lastName: "olamide",
        email: "tolc@yahoo.com",
        password: "testing",
    }
    test('update profile', async()=>{
        const result = await supertest(app).put('/profile/').send(ProfileData)
        .send({ email: ProfileData.email, password: ProfileData.password });
        
    })
})
