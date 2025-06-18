import { sql } from "../config/db.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashed = await bcrypt.hash(password, 10);
        await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashed})
        `;
        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ message: "Username or email already exists" });
        } else {
            console.error("Registration error", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export async function loginUser(req, res) {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const users = await sql`
            SELECT * FROM users WHERE username = ${usernameOrEmail} OR email = ${usernameOrEmail}
        `;
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        console.error("Login error", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
