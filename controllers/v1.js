const { Router } = require('express');
const bcrypt = require('bcrypt');
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
    userList.push([name, id]);
    keyv.set('user-list', userList);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        await keyv.set(id, { name, email, phone, location, password: hash, rep: [] });
        res.status(200).send('Registered!');
      });
    });
  }
});


router.post('/update', async (req, res) => {
  try {
    const { name, email, phone, location, password, id } = req.body;
    const userList = (await keyv.get('user-list')) || [];
    const out = userList.find((block) => block[1] === id);
    userList.splice(userList.indexOf(out), 1);
    userList.push([name, id]);
    keyv.set('user-list', userList);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await keyv.get(id);
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.location - location;
        user.password = hash;
        await keyv.set(id, user);
        res.status(200).send('Updated!');
      });
    });
  } catch {
    res.status(500).send('Error!');
  }
});

router.get('/userdata', async (req, res) => {
  const { id } = req.query;
  const userList = (await keyv.get('user-list')) || null;
  if (!userList) return res.status(500).send('Invalid Login');
  const out = userList.find((block) => block[1] === id);
  const long = userList.find((block) => block[0].length > 200);
  if (long) {
    userList.splice(userList.indexOf(long), 1);
    await keyv.set('user-list', userList)
  }
  if (!out) return res.status(500).send('Invalid Login');
  let user = await keyv.get(out[1]);
  user.id = out[1];
  if (!user.rep) user.rep = [];
  user.password = undefined;
  res.json(user);
});

router.post('/userdata/rep', async (req, res) => {
  const { id, rep } = req.body;
  const userList = (await keyv.get('user-list')) || null;
  if (!userList) return res.status(500).send('Invalid Login');
  const out = userList.find((block) => block[1] === id);
  if (!out) return res.status(500).send('Invalid Login');
  let user = await keyv.get(out[1]);
  user.id = out[1];
  if (!user.rep) user.rep = [];
  if (!user.rep.includes(rep)) user.rep.push(rep);
  await keyv.set(out[1], user);
  res.send(`Action completed`);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const userList = (await keyv.get('user-list')) || null;
  if (!userList) return res.status(500).send('Invalid Login');
  const out = userList.find((block) => block[0] === name);
  if (!out) return res.status(500).send('Invalid Login');
  let user = await keyv.get(out[1]);
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) return res.status(500).send('Invalid Login');
    user.id = out[1];
    res.json(user);
  });
});

router.post('/offer', async (req, res) => {
  const offerList = (await keyv.get('offer-list')) || [];
  offerList.push({
    title: req.body.title,
    description: req.body.description || null,
    date: req.body.date,
    tags: req.body.tags,
    author: req.body.author,
    authorid: req.body.authorid,
    email: req.body.email,
    id: makeID(15),
  });
  await keyv.set('offer-list', offerList);
  res.json(offerList);
});

router.post('/offer/remove', async (req, res) => {
  const offerList = (await keyv.get('offer-list')) || [];
  let toRemove = offerList.find((block) => block.id === req.body.id);
  offerList.splice(offerList.indexOf(toRemove), 1);
  await keyv.set('offer-list', offerList);
  res.json(offerList);
});

router.get('/offer', async (req, res) => {
  const offerList = (await keyv.get('offer-list')) || [];
  res.json({ offerList });
});

router.get('/users', async (req, res) => {
  const users = (await keyv.get('user-list')) || [];
  res.json({ users });
});

module.exports = router;
