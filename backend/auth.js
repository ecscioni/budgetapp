const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = 'postgresql://neondb_owner:npg_86hxibwtXRKp@ep-square-field-a8dgf96x-pooler.eastus2.azure.neon.tech';

const { URL } = require('url');
const dbUrl = new URL(connectionString);

const pool = new Pool({
  user: dbUrl.username,
  password: dbUrl.password,
  host: dbUrl.hostname,
  port: dbUrl.port,
  database: dbUrl.pathname.slice(1), // remove the starting '/'
  ssl: {
    rejectUnauthorized: false
  }
});

// Register user function
async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [username, email, hashedPassword]);
    console.log('User registered successfully!');
  } catch (err) {
    if (err.code === '23505') {  // Unique violation
      console.log('Username or email already exists.');
    } else {
      console.error('Registration error:', err);
    }
  }
}

// Login user function
async function loginUser(usernameOrEmail, password) {
  try {
    const query = 'SELECT password FROM users WHERE username = $1 OR email = $1';
    const res = await pool.query(query, [usernameOrEmail]);
    
    if (res.rows.length === 0) {
      console.log('Login failed: user not found.');
      return false;
    }
    
    const storedHash = res.rows[0].password;
    const match = await bcrypt.compare(password, storedHash);
    
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

// Example usage (uncomment to test):
// (async () => {
//   await registerUser('johndoe', 'john@example.com', 'mypassword123');
//   await loginUser('johndoe', 'mypassword123');
// })();

module.exports = { registerUser, loginUser };
