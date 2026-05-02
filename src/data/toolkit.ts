const rawUrl = "https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/toolkit.json";

let data = { tools: [], skills: [] };

try {
  const response = await fetch(rawUrl);
  if (response.ok) {
    data = await response.json();
  } else {
    console.error("Failed to fetch toolkit data:", response.statusText);
  }
} catch (error) {
  console.error("Error fetching toolkit data:", error);
}

export const tools = data.tools;
export const skills = data.skills;
