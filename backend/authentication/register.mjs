import readline from 'readline';
import { registerUser } from './a.mjs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

(async () => {
  try {
    console.log('\n Register a New User\n');

    const username = (await ask('Username: ')).trim();
    const email = (await ask('Email: ')).trim();
    const password = (await ask('Password: ')).trim();
    const confirmPassword = (await ask('Confirm Password: ')).trim();

    if (!username || !email || !password || !confirmPassword) {
      console.log('\n All fields are required.\n');
    } else if (!isValidEmail(email)) {
      console.log('\n Invalid email format.\n');
    } else if (password.length < 6) {
      console.log('\n Password must be at least 6 characters.\n');
    } else if (password !== confirmPassword) {
      console.log('\n Passwords do not match.\n');
    } else {
      await registerUser(username, email, password);
      console.log('\n Registration successful! You can now log in.\n');
    }
  } catch (err) {
    console.error('\n Error during registration:', err);
  } finally {
    rl.close();
  }
})();
