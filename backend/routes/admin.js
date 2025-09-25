import express from 'express';
import axios from 'axios';
const router = express.Router();

const GUILD_ID = process.env.GUILD_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_TOKEN;

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  if (!req.session.user) return res.status(401).send('Non authentifié');
  const adminRoleId = 'ID_ROLE_ADMIN'; // mettre l’ID du rôle admin Discord
  if (!req.session.user.roles?.includes(adminRoleId)) return res.status(403).send('Pas autorisé');
  next();
};

// Exemple : ban utilisateur
router.post('/ban', isAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    await axios.put(`https://discord.com/api/guilds/${GUILD_ID}/bans/${userId}`, {}, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send('Erreur lors du ban');
  }
});

export default router;

// Kick
router.post('/kick', isAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    await axios.delete(`https://discord.com/api/guilds/${GUILD_ID}/members/${userId}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send('Erreur lors du kick');
  }
});

// Mute (Timeout temporaire)
router.post('/mute', isAdmin, async (req, res) => {
  const { userId } = req.body;
  try {
    const timeoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await axios.patch(`https://discord.com/api/guilds/${GUILD_ID}/members/${userId}`, {
      communication_disabled_until: timeoutUntil.toISOString()
    }, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send('Erreur lors du mute');
  }
});

