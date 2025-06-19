import { sql } from "../config/db.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // ensure username and email are unique even if the table was created
        // without constraints
        const existing = await sql`
            SELECT 1 FROM users WHERE username = ${username} OR email = ${email}
            LIMIT 1`;
        if (existing.length > 0) {
            return res.status(409).json({ message: "Username or email already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        await sql`
            INSERT INTO users (username, email, password)
            VALUES (${username}, ${email}, ${hashed})
        `;
        res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ message: "Username or email already exists" });
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
            SELECT * FROM users
            WHERE username = ${usernameOrEmail} OR email = ${usernameOrEmail}
            ORDER BY id DESC LIMIT 1
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
