import readline from 'readline';
import { registerUser } from './a.mjs'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

(async () => {
  try {
    console.log('\n Register a New User \n');

    const username = await ask('Username: ');
    const email = await ask('Email: ');
    const password = await ask('Password: ');

    if (!username || !email || !password) {
      console.log('All fields are required.');
    } else {
      await registerUser(username.trim(), email.trim(), password.trim());
    }

    console.log('\nDone! You can now log in.\n');
  } catch (err) {
    console.error('Error during registration:', err);
  } finally {
    rl.close();
  }
})();
