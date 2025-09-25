import express from 'express';
import axios from 'axios';
const router = express.Router();

const GUILD_ID = process.env.GUILD_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_TOKEN;

// Récupérer les membres avec rôles
router.get('/', async (req, res) => {
  try {
    const guildMembersRes = await axios.get(`https://discord.com/api/guilds/${GUILD_ID}/members?limit=1000`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });

    const members = guildMembersRes.data.map(m => ({
      id: m.user.id,
      username: m.user.username,
      roles: m.roles
    }));

    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

export default router;
