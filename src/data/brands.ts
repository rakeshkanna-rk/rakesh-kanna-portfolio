const rawUrl = "https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/brands.json";

export interface BrandItem {
  id: string;
  name: string;
  role?: string;
  logo: string;
  markdown?: string;
}

// Fallback data in case remote fetch fails or is pending git push
const fallbackBrands: BrandItem[] = [
  {
    "id": "tiva",
    "name": "TIVA",
    "role": "Creative Agency",
    "logo": "/brands/images/tiva.svg",
    "markdown": "brands/tiva.md"
  },
  {
    "id": "mergex",
    "name": "MergeX",
    "role": "Information Technology",
    "logo": "/brands/images/mergex.svg",
    "markdown": "brands/mergex.md"
  },
  {
    "id": "mic-and-mac",
    "name": "Mic & Mac",
    "role": "Health & Care",
    "logo": "/brands/images/micandmac.svg",
    "markdown": "brands/mic-and-mac.md"
  },
  {
    "id": "runverve",
    "name": "Runverve",
    "role": "Sports & Lifestyle",
    "logo": "/brands/images/runverve.svg",
    "markdown": "brands/runverve.md"
  }
];

let data: BrandItem[] = fallbackBrands;

try {
  const response = await fetch(rawUrl);
  if (response.ok) {
    data = await response.json();
  } else {
    console.warn("Using fallback brands data:", response.statusText);
  }
} catch (error) {
  console.warn("Error fetching brands data, using fallback:", error);
}

export const brands: BrandItem[] = data;
