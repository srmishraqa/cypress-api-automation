/**
 * 1. POST using hardcoded JSON payload
 * 2. POST using random function to generate random data to pass in the body
 * 3. Read data from cypress fixture and use it in request body
 *    a. using require -> const
 *    b. using cy.fixture -> callback
 *
 * We will try all the above ones in this example
 */

const createUserData = require("../../fixtures/createUser");

describe("POST calls - user creations", () => {
  let accessToken =
    "d7938d0a9e5dbd50ce0f9b2442ea92bc43554e7a515381480be02ec70ada37b0";
  let randomText = "";
  let testEmail = "";

  it("POST - Create single user", () => {
    // code for making a random function string
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + "@gmail.com";

    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v1/users",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: {
        name: createUserData.name,
        gender: createUserData.gender,
        email: testEmail,
        status: createUserData.status,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.be.eq(201);
      expect(res.body.data).has.property("email", testEmail);
      expect(res.body.data).has.property("name", createUserData.name);
    });
  });
});
