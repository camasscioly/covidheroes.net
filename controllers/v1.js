const { Router } = require('express');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.post('/us', async (req, res) => {
  await keyv.set('us', req.body);
  res.json(req.body);
});

router.get('/us', async (req, res) => {
  res.json(await keyv.get('us') || {});
});

module.exports = router;
