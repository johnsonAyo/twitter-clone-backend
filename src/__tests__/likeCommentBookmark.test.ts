import app from "../app";
import supertest from "supertest";

let token: string;
let userId: string;
let tweetId: string;
let emailToken: string;


describe('Auth', () => {
  const userData = {
    firstName: 'Tolu',
    lastName: 'Johnson',
    email: 'tolz@yahoo.com',
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
    //console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body.user.isActive).toBe(true);
  });
});

describe("tweet", () => {
    const data = {
        messageBody: "newfhfjkfjkejkdjckdjenfiefh",
        whoCanReply: "newseclknclknclkcnlncln"
    }

    test("tweet", async() => {
        const response = await supertest(app)
                            .post(`/tweet`)
                            .set("Authorization", `Bearer ${token}`)
                            .send(data)
        console.log(response.body)
                            //tweetId = response.body._id
    })
})

describe("comment", () => {
    const data = {
        content: "This is a comment"
    }

    test("comment", async () => {
        const response = await supertest(app)
                                .post(`/tweet/${tweetId}/comment`)
                                .set("Authorization", `Bearer ${token}`)
        console.log(response.body)
    })

})