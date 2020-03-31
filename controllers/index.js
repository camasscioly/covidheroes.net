const { Router } = require('express');
const url = require('url');
const renderFile = require('./../middleware/renderFile.js');
const toLogin = require('./../middleware/toLogin.js');
const toProfile = require('./../middleware/toProfile.js');
const Keyv = require('keyv');
const csrf = require('csurf');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();
const csrfProtection = csrf({ cookie: true });

router.get('/', async (req, res) => {
  renderFile(req, res, 'index');
});

router.get('/discuss', async (req, res) => {
  renderFile(req, res, 'discussion');
});

router.get('/heroes', toLogin, async (req, res) => {
  renderFile(req, res, 'users');
});

router.get('/login', toProfile, async (req, res) => {
  renderFile(req, res, 'login');
});

router.get('/signup', toProfile, csrfProtection, async (req, res) => {
  renderFile(req, res, 'signup', { csrfToken: req.csrfToken() });
});

router.get('/me', toLogin, csrfProtection, async (req, res) => {
  renderFile(req, res, 'user', { csrfToken: req.csrfToken() });
});

router.get('/new', toLogin, csrfProtection, async (req, res) => {
  renderFile(req, res, 'new', { csrfToken: req.csrfToken() });
});

router.get('/requests', async (req, res) => {
  renderFile(req, res, 'offers');
});

router.get('/requests/open', async (req, res) => {
  renderFile(req, res, 'request');
});

router.get('/profile', toLogin, async (req, res) => {
  renderFile(req, res, 'profile');
});

router.get('/terms', async (req, res) => {
  renderFile(req, res, 'terms');
});

router.get('/team', async (req, res) => {
  renderFile(req, res, 'team');
});

router.get('/@:username', async (req, res) => {
  const name = req.params.username.toLowerCase();
  const userList = (await keyv.get('user-list')) || [];
  const id = userList.find((block) => block[0] === name)[1];
  if (!id) return renderFile(req, res, '404');
  const origin = url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
  res.redirect(`${origin}/profile?id=${id}`);
});

router.use((req, res) => {
  renderFile(req, res, '404');
});

module.exports = router;
