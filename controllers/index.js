const { Router } = require('express');
const url = require('url');
const renderFile = require('./../middleware/renderFile.js');
const toLogin = require('./../middleware/toLogin.js');
const toProfile = require('./../middleware/toProfile.js');
const toSubmissions = require('./../middleware/toSubmissions.js');
const appPage = require('./../middleware/appPage.js');
const normalPage = require('./../middleware/normalPage.js');
const Keyv = require('keyv');
const csrf = require('csurf');
const keyv = new Keyv(process.env.DB_URL);

keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();
const csrfProtection = csrf({ cookie: true });

router.get('/', toSubmissions, normalPage, async (req, res) => {
  renderFile(req, res, 'index');
});
///
router.get('/community', normalPage, async (req, res) => {
  renderFile(req, res, 'discussion');
});

router.get('/heroes', toLogin, appPage, async (req, res) => {
  renderFile(req, res, 'users');
});

router.get('/login', toSubmissions, appPage, async (req, res) => {
  renderFile(req, res, 'login');
});

router.get('/signup', toSubmissions, appPage, csrfProtection, async (req, res) => {
  renderFile(req, res, 'signup', { csrfToken: req.csrfToken() });
});

router.get('/me', toLogin, appPage, csrfProtection, async (req, res) => {
  renderFile(req, res, 'user', { csrfToken: req.csrfToken() });
});

router.get('/configure', toLogin, appPage, csrfProtection, async (req, res) => {
  renderFile(req, res, 'preconf', { csrfToken: req.csrfToken() });
});

router.get('/new', toLogin, appPage, csrfProtection, async (req, res) => {
  renderFile(req, res, 'new', { csrfToken: req.csrfToken() });
});

router.get('/requests', appPage, async (req, res) => {
  renderFile(req, res, 'offers'); // deprecate this later
});

router.get('/submissions', appPage, async (req, res) => {
  renderFile(req, res, 'offers');
});

router.get('/posts', appPage, async (req, res) => {
  renderFile(req, res, 'offers');
});

router.get('/requests/open', appPage, async (req, res) => {
  renderFile(req, res, 'request');
});

router.get('/submissions/open', appPage, async (req, res) => {
  renderFile(req, res, 'request'); // deprecate this later
});

router.get('/posts/open', appPage, async (req, res) => {
  renderFile(req, res, 'request'); // deprecate this later
});

router.get('/profile', toLogin, appPage, async (req, res) => {
  renderFile(req, res, 'profile');
});

router.get('/terms', normalPage, async (req, res) => {
  renderFile(req, res, 'terms');
});

router.get('/team', normalPage, async (req, res) => {
  renderFile(req, res, 'team');
});

router.get('/@:username', appPage, async (req, res) => {
  try {
    const name = req.params.username.toLowerCase();
    const userList = (await keyv.get('user-list')) || [];
    const id = userList.find((block) => block[0] === name)[1];
    const origin = url.format({
      protocol: req.protocol,
      host: req.get('host'),
    });
    res.redirect(`${origin}/profile?id=${id}`);
  } catch (err) {
    console.error(err);
    renderFile(req, res, '404');
  }
});

router.use(normalPage, (req, res) => {
  renderFile(req, res, '404');
});

module.exports = router;
