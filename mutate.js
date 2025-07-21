const fs = require("fs");

const functionTemplates = [
  () => \`return "Math magic: \${Math.floor(Math.random() * 10)} * \${Math.floor(Math.random() * 10)}";\`,
  () => \`return "Emoji blast: \${String.fromCodePoint(0x1F600 + Math.floor(Math.random() * 50))}";\`,
  () => \`return "Hex color: #\${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}";\`,
  () => \`return "Quote: 'The time is always right to do what is right.'";\`,
  () => \`return "Current seconds: " + new Date().getSeconds();\`
];

const pickNewFunction = () => {
  const name = "func_" + Math.random().toString(36).substring(2, 8);
  const body = functionTemplates[Math.floor(Math.random() * functionTemplates.length)]();
  return \`function \${name}() { \${body} }\`;
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
  console.log(\`✅ Replaced function #\${i + 1}\`);
};

mutate();