const shirtTypes = ["hoodie", "polo", "shirt"];
const pantTypes = ["pant", "short"];

const classifyType = (item) => {
  if (!item || !item.type) return "unknown";
  const type = item.type.toLowerCase();
  if (shirtTypes.includes(type)) return "shirt";
  if (pantTypes.includes(type)) return "pant";
  return "unknown";
};

// test
const testItems = [
  { name: "Hoodie A", type: "hoodie" },
  { name: "Polo B", type: "polo" },
  { name: "Shirt C", type: "shirt" },
  { name: "Pant D", type: "pant" },
  { name: "Short E", type: "short" },
  { name: "Mystery F", type: "unknown" },
];

console.log(
  testItems.map((i) => ({ name: i.name, classified: classifyType(i) }))
);
