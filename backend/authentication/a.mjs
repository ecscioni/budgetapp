import { Pool } from 'pg';
import { hash, compare } from 'bcrypt';

const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_86hxibwtXRKp',
  host: 'ep-square-field-a8dgf96x-pooler.eastus2.azure.neon.tech',
  database: 'neondb',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function registerUser(username, email, password) {
  const hashedPassword = await hash(password, 10);
  try {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [username, email, hashedPassword]);
    console.log(' User registered successfully!');
  } catch (err) {
    if (err.code === '23505') {
      console.log('Username or email already exists.');
    } else {
      console.error('Registration error:', err);
    }
  }
}

export async function loginUser(usernameOrEmail, password) {
  try {
    const query = 'SELECT password FROM users WHERE username = $1 OR email = $1';
    const res = await pool.query(query, [usernameOrEmail]);

    if (res.rows.length === 0) {
      console.log('Login failed: user not found.');
      return false;
    }

    const storedHash = res.rows[0].password;
    const match = await compare(password, storedHash);

    if (match) {
      console.log('Login successful!');
      return true;
    } else {
      console.log('Login failed: incorrect password.');
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    return false;
  }
}
<<<<<<< HEAD:backend/authentication/auth.js

// Example usage (uncomment to test):
// (async () => {
//   await registerUser('johndoe', 'john@example.com', 'mypassword123');
//   await loginUser('johndoe', 'mypassword123');
// })();

export default { registerUser, loginUser };
//hi///
=======
>>>>>>> 882da94d13243428b8d6ca3eb5fafd9ee3808b00:backend/authentication/a.mjs
