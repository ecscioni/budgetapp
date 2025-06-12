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

async function createBudget(user_id, category_name, time_frame_name, amount_limit) {
  try {
    const category = await pool.query('SELECT id FROM Category WHERE name = $1', [category_name]);
    const timeFrame = await pool.query('SELECT id FROM TimeFrame WHERE name = $1', [time_frame_name]);

    if (category.rows.length === 0 || timeFrame.rows.length === 0) {
      throw new Error('Invalid category or time frame name');
    }

    const category_id = category.rows[0].id;
    const time_frame_id = timeFrame.rows[0].id;

    const insert = await pool.query(
      `INSERT INTO Budget (user_id, category_id, time_frame_id, amount_limit)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, category_id, time_frame_id, amount_limit]
    );

    console.log('Budget created:', insert.rows[0]);
  } catch (err) {
    console.error('Error creating budget:', err.message);
  }
}


async function createGoal(user_id, name, category_name, time_frame_name, target_amount, start_date, end_date) {
    console.log({ user_id, name, category_name, time_frame_name, target_amount, start_date, end_date });
  try {
    const category = await pool.query('SELECT id FROM Category WHERE name = $1', [category_name]);
    const timeFrame = await pool.query('SELECT id FROM TimeFrame WHERE name = $1', [time_frame_name]);

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

    console.log(' created:', insert.rows[0]);
  } catch (err) {
    console.error('Error creating goal:', err.message);
  }
}

async function main() {
  await createBudget(1, 'Savings', 'bi-weekly', 600);
  await createGoal(1, 'New Phone', 'Savings', 'yearly', 1000, '2025-06-01', '2025-12-31');
  await pool.end();
}

main();
