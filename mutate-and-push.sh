#!/bin/bash

# 1. Run the mutation script
echo "🧬 Running mutation..."
node mutate.js

# 2. Stage changes
git add functions.js

# 3. Commit with a timestamp
COMMIT_MSG="🧬 Function mutated at $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# 4. Push to GitHub
git push

echo "✅ Mutation committed and pushed!"

