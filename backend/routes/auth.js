import express from 'express';
import axios from 'axios';
import qs from 'qs';
const router = express.Router();

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const GUILD_ID = process.env.GUILD_ID;

// Étape 1 : Rediriger vers Discord pour login
router.get('/login', (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  res.redirect(url);
});

// Étape 2 : Callback après login
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  try {
    // Récupérer le token
    const tokenRes = await axios.post('https://discord.com/api/oauth2/token',
      qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const access_token = tokenRes.data.access_token;

    // Récupérer les infos utilisateur
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Récupérer les guildes
    const guildsRes = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Vérifier si l’utilisateur est dans le serveur
    const guild = guildsRes.data.find(g => g.id === GUILD_ID);
    if (!guild) return res.send('Vous n\'êtes pas dans le serveur');

    // Sauvegarder en session
    req.session.user = userRes.data;
    req.session.guild = guild;
    res.redirect('http://localhost:3000'); // frontend
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'authentification');
  }
});

export default router;
