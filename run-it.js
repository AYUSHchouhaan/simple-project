#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Running the dashboard application...');

// Run the main start script from package.json
const child = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  console.log(`Application exited with code ${code}`);
});