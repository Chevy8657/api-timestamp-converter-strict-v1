'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '64kb' }));

// Render Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Timestamp Converter Endpoint
app.post('/v1/convert', (req, res) => {
  const { input } = req.body;
  try {
    const date = new Date(input);
    if (isNaN(date.getTime())) throw new Error();
    res.status(200).json({
      output: {
        iso: date.toISOString(),
        unix_ms: date.getTime(),
        unix_s: Math.floor(date.getTime() / 1000)
      }
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid input. Provide a valid Date string or Unix timestamp.' });
  }
});

app.listen(process.env.PORT || 10000);
