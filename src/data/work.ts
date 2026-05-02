const rawUrl = "https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/work.json";

let data = { projects: [], posters: [] };

try {
  const response = await fetch(rawUrl);
  if (response.ok) {
    data = await response.json();
  } else {
    console.error("Failed to fetch work data:", response.statusText);
  }
} catch (error) {
  console.error("Error fetching work data:", error);
}

export const projects = data.projects;
export const posters = data.posters;
