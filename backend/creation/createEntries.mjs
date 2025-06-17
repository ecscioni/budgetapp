import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'neondb_owner',
  password: 'npg_86hxibwtXRKp',
  host: 'ep-square-field-a8dgf96x-pooler.eastus2.azure.neon.tech',
  database: 'neondb',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function createBudget(user_id, name, category_name, time_frame_name, amount_limit) {
  try {
    console.log('Creating budget for user:', user_id, '| Budget:', name);

    const category = await pool.query(
      'SELECT id FROM Category WHERE LOWER(name) = LOWER($1)',
      [category_name]
    );
    const timeFrame = await pool.query(
      'SELECT id FROM TimeFrame WHERE LOWER(name) = LOWER($1)',
      [time_frame_name]
    );

    if (category.rows.length === 0 || timeFrame.rows.length === 0) {
      throw new Error('Invalid category or time frame name');
    }

    const category_id = category.rows[0].id;
    const time_frame_id = timeFrame.rows[0].id;

    const insert = await pool.query(
      `INSERT INTO Budget (user_id, name, category_id, time_frame_id, amount_limit)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, name, category_id, time_frame_id, amount_limit]
    );

    console.log('Budget created:', insert.rows[0]);
  } catch (err) {
    console.error('Error creating budget:', err);
  }
}


async function createGoal(user_id, name, category_name, time_frame_name, target_amount, start_date, end_date) {
  try {
    console.log('Creating goal for user:', user_id, '| Goal:', name);

    const category = await pool.query(
      'SELECT id FROM Category WHERE LOWER(name) = LOWER($1)',
      [category_name]
    );
    const timeFrame = await pool.query(
      'SELECT id FROM TimeFrame WHERE LOWER(name) = LOWER($1)',
      [time_frame_name]
    );

    if (category.rows.length === 0 || timeFrame.rows.length === 0) {
      throw new Error('Invalid category or time frame name');
    }

    const category_id = category.rows[0].id;
    const time_frame_id = timeFrame.rows[0].id;

    const insert = await pool.query(
      `INSERT INTO Goal (user_id, name, category_id, time_frame_id, target_amount, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, name, category_id, time_frame_id, target_amount, start_date, end_date]
    );

    console.log('Goal created:', insert.rows[0]);
  } catch (err) {
    console.error('Error creating goal:', err);
  }
}


async function main() {
  await createBudget(7, 'dinner', 'Food', 'weekly', 35);
  await createGoal(7, 'abs surgery', 'Health', 'monthly', 50, '2025-06-17', '2025-12-31');
  await pool.end();
}

main();
