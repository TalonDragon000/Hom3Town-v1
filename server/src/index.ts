import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import avatarRoutes from './routes/avatars';

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

// Serve built client in production
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/avatars', avatarRoutes);

// Fallback to client SPA for all non-api routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
