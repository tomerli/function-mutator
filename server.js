const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Mutate endpoint
app.post('/mutate', (req, res) => {
  exec('node mutate.js', (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).send('Mutation failed');
    }
    // Commit and push the change
    exec('git add functions.js && git commit -m "🧬 Manual mutation at $(date)" && git push', (err, out, errout) => {
      if (err) {
        console.error(errout);
        return res.status(500).send('Mutation committed but push failed');
      }
      // Extract the function index from the output
      const match = stdout.match(/Replaced function #(\d+)/);
      const functionIndex = match ? match[1] : '1';
      res.json({ success: true, mutatedIndex: functionIndex });
    });
  });
});

// Reset endpoint
app.post('/reset', (req, res) => {
  const defaultFunctions = `function func_alpha() { return "Math magic: 3 * 7"; }
function func_beta() { return "Emoji blast: 😊"; }
function func_gamma() { return "Hex color: #aabbcc"; }
function func_delta() { return "Quote: 'The time is always right to do what is right.'"; }
function func_epsilon() { return "Current seconds: 30"; }
function func_zeta() { return "Random number: 42"; }
function func_eta() { return "Current minute: 15"; }
function func_theta() { return "Color name: red"; }
function func_iota() { return "Animal sound: Meow"; }
function func_kappa() { return "Day of week: Monday"; }`;

  fs.writeFileSync('./functions.js', defaultFunctions);
  res.send('Reset successful');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 