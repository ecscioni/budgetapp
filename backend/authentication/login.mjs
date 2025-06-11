import readline from 'readline';
import { loginUser } from './a.mjs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

(async () => {
  try {
    console.log('\n User Login\n');

    const usernameOrEmail = (await ask('Username or Email: ')).trim();
    const password = (await ask('Password: ')).trim();

    if (!usernameOrEmail || !password) {
      console.log('\n Both fields are required.\n');
    } else {
      const success = await loginUser(usernameOrEmail, password);

      if (success) {
        console.log('\n Login successful! Welcome back.\n');
      } else {
        console.log('\n Login failed. Check your credentials.\n');
      }
    }
  } catch (err) {
    console.error('\n Error during login:', err);
  } finally {
    rl.close();
  }
})();
