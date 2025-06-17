import { sql } from "../config/db.js";

export async function getGoalsByUserId(req, res) {
  try {
    const { user_id } = req.params;
    const goals = await sql`SELECT * FROM goals WHERE user_id = ${user_id} ORDER BY id`;
    res.status(200).json(goals);
  } catch (error) {
    console.log("Error getting goals", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createGoal(req, res) {
  try {
    const { user_id, name, current, target } = req.body;
    if (!user_id || !name || target === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const curr = current || 0;
    const result = await sql`
      INSERT INTO goals(user_id, name, current, target)
      VALUES(${user_id}, ${name}, ${curr}, ${target})
      RETURNING *`;
    res.status(201).json(result[0]);
  } catch (error) {
    console.log("Error creating goal", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateGoal(req, res) {
  try {
    const { id } = req.params;
    const { name, current, target } = req.body;
    const result = await sql`
      UPDATE goals
      SET name = ${name}, current = ${current}, target = ${target}
      WHERE id = ${id}
      RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.log("Error updating goal", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteGoal(req, res) {
  try {
    const { id } = req.params;
    const result = await sql`DELETE FROM goals WHERE id = ${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    console.log("Error deleting goal", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
