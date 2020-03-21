const { Router } = require('express');
const auth = require('./../middleware/auth.js');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.post('/global/timeline/cases', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('global-timeline-cases', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global/timeline/cases', async (req, res) => {
  res.json(await keyv.get('global-timeline-cases') || {});
});

router.post('/global/timeline/death', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('global-timeline-death', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global/timeline/death', async (req, res) => {
  res.json(await keyv.get('global-timeline-death') || {});
});

router.post('/global/timeline/cases/predictions', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('global-timeline-cases-predictions', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global/timeline/cases/predictions', async (req, res) => {
  res.json(await keyv.get('global-timeline-cases-predictions') || {});
});

router.post('/global/timeline/death/predictions', auth, async (req, res) => {
  delete req.query.token;
  await keyv.set('global-timeline-death-predictions', req.body);
  console.log(req.body);
  res.json(req.body);
});

router.get('/global/timeline/death/predictions', async (req, res) => {
  res.json(await keyv.get('global-timeline-death-predictions') || {});
});

module.exports = router;
