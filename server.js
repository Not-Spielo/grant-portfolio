#!/usr/bin/env node

/**
 * Simple HTTP Server for Portfolio Website
 * 
 * Usage: node server.js
 * Then visit http://localhost:3000 in your browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.md': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
};

const server = http.createServer((req, res) => {
  // Default to index.html for root
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Security: prevent directory traversal
  filePath = path.join(__dirname, filePath);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try to serve index.html for non-existent files (for client-side routing)
      filePath = path.join(__dirname, 'index.html');
      fs.stat(filePath, (err) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
          return;
        }
        serveFile(filePath, res);
      });
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
      return;
    }

    res.writeHead(200, { 
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`\n✨ Portfolio server running at http://localhost:${PORT}\n`);
  console.log(`   Press Ctrl+C to stop the server\n`);
});
