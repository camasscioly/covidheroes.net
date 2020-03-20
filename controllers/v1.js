const { Router } = require('express');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.get('/set/us', async (req, res) => {
  await keyv.set('us', req.query);
  res.json(req.query);
});

router.get('/get/us', async (req, res) => {
  res.json(await keyv.get('us') || {});
});

module.exports = router;
