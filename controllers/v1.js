const { Router } = require('express');
const auth = require('./../middleware/auth.js');
const makeID = require('./../middleware/makeID.js');
const Keyv = require('keyv');
const keyv = new Keyv(process.env.DB_URL);
keyv.on('error', (err) => {
  console.error(err);
});

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, phone, location, password } = req.body;
  const userList = (await keyv.get('user-list')) || [];
  try {
    const out = userList.find((block) => block[0] === name);
    if (out) res.status(500).send('Already Registered');
    else throw new Error('Throw back to default');
  } catch (err) {
    const id = makeID(10);
    userList.push([ name, id ]);
    keyv.set('user-list', userList);
    await keyv.set(id, { name, email, phone, location, password });
    res.status(200).send('Registered!');
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const userList = (await keyv.get('user-list')) || null;
  if (!userList) return res.status(500).send('Invalid Login');
  const out = userList.find((block) => block[0] === name);
  if (!out) return res.status(500).send('Invalid Login');
  const user = await keyv.get(out[1]);
  res.json(user);
});

module.exports = router;
