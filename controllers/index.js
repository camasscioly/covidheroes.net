const { Router } = require('express');
const url = require('url');
const cmd = require('node-cmd');
const crypto = require('crypto');
const renderFile = require('./../middleware/renderFile.js');
const toLogin = require('./../middleware/toLogin.js');
const toProfile = require('./../middleware/toProfile.js');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

const verifySignature = ({ body, headers }, res, next) => {
  const payload = JSON.stringify(body);
  const hmac = crypto.createHmac('sha1', process.env.SECRET);
  const digest = `sha1=${hmac.update(payload).digest('hex')}`;
  const checksum = headers['x-hub-signature'];

  if (!checksum || !digest || checksum !== digest) {
    return res.status(403).send('auth failed');
  }

  return next();
};

router.post('/git', verifySignature, (req, res) => {
  if (req.headers['x-github-event'] === 'push') {
    cmd.get('bash git.sh', (err, data) => {
      if (err) return console.log(err);
      console.log(data);
      cmd.run('refresh');
      return res.status(200).send(data);
    });
  }
});

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

router.get('/signup', toProfile, async (req, res) => {
  renderFile(req, res, 'signup');
});

router.get('/me', toLogin, async (req, res) => {
  renderFile(req, res, 'user');
});

router.get('/new', toLogin, async (req, res) => {
  renderFile(req, res, 'new');
});

router.get('/requests', toLogin, async (req, res) => {
  renderFile(req, res, 'offers');
});

router.get('/requests/open', toLogin, async (req, res) => {
  renderFile(req, res, 'request');
});

router.get('/profile', toLogin, async (req, res) => {
  renderFile(req, res, 'profile');
});

router.get('/terms', async (req, res) => {
  renderFile(req, res, 'terms');
});

router.get('/@:username', async (req, res) => {
  const name = req.params.username;
  const userList = (await keyv.get('user-list')) || [];
  const id = userList.find((block) => block[0] === name)[1];
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
