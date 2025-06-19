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

function isValidEmail(email) {
  const trimmedEmail = email.trim().toLowerCase();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) return false;

  const domain = trimmedEmail.split('@')[1];
  const domainParts = domain.split('.');

  const lastPart = domainParts[domainParts.length - 1];
  const secondLastPart = domainParts[domainParts.length - 2];

  if (lastPart === secondLastPart) {
    return false;
  }

  return true;
}

export async function registerUser(username, email, password) {
  const hashedPassword = await hash(password, 10);
  try {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [username, email.toLowerCase(), hashedPassword]);
  } catch (err) {
    if (err.code === '23505') {
      throw new Error('Username or email already exists.');
    } else {
      throw err;
    }
  }
}

export async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1)';
  const result = await pool.query(query, [email]);
  return result.rows[0]; 
}

export async function loginUser(usernameOrEmail, password) {
  try {
    const query = `
      SELECT * FROM users 
      WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)
    `;
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

export { isValidEmail };
