const { Router } = require('express');
const auth = require('./../middleware/auth.js');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.post('/us', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('us', req.query);
  res.json(req.query);
});

router.get('/us', async (req, res) => {
  res.json(await keyv.get('us') || {});
});

module.exports = router;
