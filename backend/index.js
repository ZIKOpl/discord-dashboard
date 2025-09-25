import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Socket.IO Chat
io.on('connection', (socket) => {
  console.log('Utilisateur connecté');
  socket.on('sendMessage', (msg) => io.emit('receiveMessage', msg));
  socket.on('disconnect', () => console.log('Utilisateur déconnecté'));
});

server.listen(process.env.PORT, () => console.log(`Backend lancé sur le port ${process.env.PORT}`));
