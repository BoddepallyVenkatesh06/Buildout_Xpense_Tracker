#!/bin/sh
# Exit script on error
set -e

# npm install
node assessment/runCypress.js

# Run Python script to process combined results
python3 assessment/process_filtered_logs.py combinedResults.json
