import { Goal } from "../data/goals";
import Constants from "expo-constants";

function resolveBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  // Attempt to infer local LAN address from Expo config
  const host =
    Constants.expoConfig?.hostUri?.split(":" )[0] ||
    Constants.manifest?.debuggerHost?.split(":" )[0];

  if (host) return `http://${host}:5001`;

  return "http://localhost:5001";
}

const BASE_URL = resolveBaseUrl();

export async function fetchGoals(userId: string): Promise<Goal[]> {
  const res = await fetch(`${BASE_URL}/api/goals/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(goal: Omit<Goal, "id"> & { user_id: string }): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/api/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  return res.json();
}

export async function updateGoal(id: string, goal: Partial<Goal>): Promise<Goal> {
  const res = await fetch(`${BASE_URL}/api/goals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to update goal");
  return res.json();
}

export async function deleteGoal(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/goals/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete goal");
}
