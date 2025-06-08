const { registerUser, loginUser } = require('./auth');

async function test() {
  // Try registering a user
  await registerUser('testuser', 'testuser@example.com', 'mypassword123');

  // Try logging in
  const loggedIn = await loginUser('testuser', 'mypassword123');
  console.log('Logged in:', loggedIn);
}

test();

console.log('Starting testAuth.js');

const { registerUser, loginUser } = require('./auth');

async function test() {
  console.log('Inside test function');

  await registerUser('testuser', 'testuser@example.com', 'mypassword123');

  const loggedIn = await loginUser('testuser', 'mypassword123');
  console.log('Logged in:', loggedIn);
}

test();
