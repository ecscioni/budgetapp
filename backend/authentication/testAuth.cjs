// This file is used to test the authentication functions in auth.js
const { registerUser, loginUser } = require('./auth').default;

console.log('Starting testAuth.js');

async function test() {
  console.log('Inside test function');

  await registerUser('testuser', 'testuser@example.com', 'mypassword123');

  const loggedIn = await loginUser('testuser', 'mypassword123');
  console.log('Logged in:', loggedIn);
}

test();
