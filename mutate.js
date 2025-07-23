const fs = require("fs");

const quotes = [
  "The time is always right to do what is right.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Life is what happens when you're busy making other plans.",
  "You miss 100% of the shots you don't take.",
  "The only way to do great work is to love what you do.",
  "If you can dream it, you can do it.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "The best way to predict the future is to invent it."
];

const functionTemplates = [
  () => `return "Math magic: ${Math.floor(Math.random() * 10)} * ${Math.floor(Math.random() * 10)}";`,
  () => `return "Emoji blast: ${["😊", "😂", "🥺", "😒", "😎", "🤔", "😍", "😴"][Math.floor(Math.random() * 8)]}";`,
  () => `return "Hex color: #${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}";`,
  () => `return "Quote: '${quotes[Math.floor(Math.random() * quotes.length)]}'";`,
  () => `return "Current seconds: ${new Date().getSeconds()}";`,
  () => `return "Random number: ${Math.floor(Math.random() * 1000)}";`,
  () => `return "Current minute: ${new Date().getMinutes()}";`,
  () => `return "Color name: ${["red", "blue", "green", "yellow", "purple", "orange"][Math.floor(Math.random() * 6)]}";`,
  () => `return "Animal sound: ${["Meow", "Woof", "Quack", "Moo", "Neigh", "Baa"][Math.floor(Math.random() * 6)]}";`,
  () => `return "Day of week: ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]}";`,
  () => `return "Weather: ${["Sunny", "Rainy", "Cloudy", "Windy", "Stormy", "Snowy"][Math.floor(Math.random() * 6)]}";`,
  () => `return "Fruit: ${["Apple", "Banana", "Cherry", "Grape", "Orange", "Peach"][Math.floor(Math.random() * 6)]}";`,
  () => `return "Motivation: ${["Keep going!", "You can do it!", "Stay positive!", "Never give up!", "Dream big!", "Work hard!"][Math.floor(Math.random() * 6)]}";`
];

const pickNewFunction = () => {
  const name = "func_" + Math.random().toString(36).substring(2, 8);
  const body = functionTemplates[Math.floor(Math.random() * functionTemplates.length)]();
  return `function ${name}() { ${body} }`;
};

const mutate = () => {
  const path = "./functions.js";
  let content = fs.readFileSync(path, "utf8");
  const matches = content.match(/function func_\w+\(\) \{[^}]+\}/g);

  if (!matches || matches.length === 0) return;

  const i = Math.floor(Math.random() * matches.length);
  const newFn = pickNewFunction();

  const newContent = content.replace(matches[i], newFn);
  fs.writeFileSync(path, newContent);
  console.log(`✅ Replaced function #${i + 1}`);
};

mutate();