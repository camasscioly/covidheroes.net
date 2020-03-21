const { Router } = require('express');
const auth = require('./../middleware/auth.js');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.post('/global', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('global', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global', async (req, res) => {
  res.json(await keyv.get('global') || {});
});

router.post('/us', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('us', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/us', async (req, res) => {
  res.json(await keyv.get('us') || {});
});

router.post('/us/timeline', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('ustimeline', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/us/timeline', async (req, res) => {
  res.json(await keyv.get('ustimeline') || {});
});

router.post('/global/timeline', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('globaltimeline', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global/timeline', async (req, res) => {
  res.json(await keyv.get('globaltimeline') || {});
});

router.post('/us/timeline/predictions', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('ustimelinepredictions', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/us/timeline/predictions', async (req, res) => {
  res.json(await keyv.get('ustimelinepredictions') || {});
});

module.exports = router;
