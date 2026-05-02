const rawUrl = "https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/about.json";

let data = { aboutText: "", experiences: [] };

try {
  const response = await fetch(rawUrl);
  if (response.ok) {
    data = await response.json();
  } else {
    console.error("Failed to fetch about data:", response.statusText);
  }
} catch (error) {
  console.error("Error fetching about data:", error);
}

export const aboutText = data.aboutText;
export const experiences = data.experiences;
