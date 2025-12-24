// Shared constants across the app
export const SHIRT_TYPES = ["hoodie", "polo", "jacket", "t-shirt"];
export const PANT_TYPES = ["pant", "short"];

export const classifyProductType = (item) => {
  if (!item) return "unknown";
  const cat = (item.category || item.type || item.name || "")
    .toString()
    .trim()
    .toLowerCase();

  if (cat && SHIRT_TYPES.some((t) => cat.includes(t))) return "shirt";
  if (cat && PANT_TYPES.some((t) => cat.includes(t))) return "pant";
  return "unknown";
};
