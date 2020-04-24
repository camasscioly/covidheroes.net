const { Router } = require('express');
const bcrypt = require('bcrypt');
const makeID = require('./../middleware/makeID.js');
const Keyv = require('keyv');
const csrf = require('csurf');
const sendgrid = require('@sendgrid/mail');
const { Webhook } = require('discord-webhook-node');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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
    let id = makeID(10);
    while ((await keyv.get(id)) || undefined) {
      id = makeID(10);
    }
    userList.push([name, id]);
    keyv.set('user-list', userList);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        await keyv.set(id, { name, email, phone, location, password: hash, rep: [] });
        const msg = {
          to: email,
          from: 'aiden@covidheroes.net',
          templateId: 'd-15d7bb027f4f4c739d0a4f3db911a1d0',
          dynamic_template_data: {
            name: name,
          },
        };
        sendgrid.send(msg);
        const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

        hook.send(`Signup: ${name}`);
        res.status(200).send(id);
      });
    });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { name, email, phone, location, password, id, original, color } = req.body;
    const userList = (await keyv.get('user-list')) || [];
    const out = userList.find((block) => block[1] === id);
    const checkIllegal = userList.find((block) => block[0] === name) || 0;
    if (name !== original) if (checkIllegal) return res.send('Already Registered');
    userList.splice(userList.indexOf(out), 1);
    userList.push([name, id]);
    keyv.set('user-list', userList);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await keyv.get(id);
        user.name = name;
        user.email = email;
        user.color = color;
        user.phone = phone || 'Not Configured';
        user.location = location || 'Not Configured';
        user.password = hash;
        await keyv.set(id, user);
        const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

        hook.send(`Profile Update: ${name}`);
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
    await keyv.set('user-list', userList);
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
  const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  hook.send(`Rep: ${out[0]}`);
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
    const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

    hook.send(`Login: ${name}`);
    res.json(user);
  });
});

router.post('/offer', async (req, res) => {
  let offerList = (await keyv.get('offer-list')) || [];
  let userList = (await keyv.get('user-list')) || [];
  let counter = (await keyv.get('offer-count')) || 0;
  let id = makeID(15);
  while ((await keyv.get(id)) || undefined) {
    id = makeID(15);
  }
  counter++;
  offerList.push({
    title: req.body.title,
    description: req.body.description || null,
    date: req.body.date,
    tags: req.body.tags,
    author: req.body.author,
    authorid: req.body.authorid,
    email: req.body.email,
    comments: 0,
    id,
    type: req.body.type || 'request',
    skills: req.body.skills || [],
  });

  let emails = [];
  for (let u of userList) {
    const { email } = await keyv.get(u[1]);
    emails.push({
      to: email,
      from: 'aiden@covidheroes.net',
      templateId: 'd-a02e2d6bf89c4fcaab28762d98442a1f',
      dynamic_template_data: {
        icon: req.body.type || 'request' !== 'request' ? '❤️' : '✋',
        item: req.body.title,
        skills: req.body.skills.join(', '),
        type: req.body.type || 'request' === 'request' ? 'needs help with' : 'can help with',
        author: req.body.author,
        address: req.body.description || null,
        link: `https://app.covidheroes.net/posts/open?id=${id}`,
      },
    });
  }
  sendgrid.send(emails);

  const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  hook.send(`New Post: ${title}`);

  await keyv.set('offer-list', offerList);
  await keyv.set('offer-count', counter);
  res.json(offerList);
});

router.get('/offer/increment', async (req, res) => {
  let offerList = (await keyv.get('offer-list')) || [];
  let out = offerList.find(({ id }) => id === req.query.id);
  offerList.splice(offerList.indexOf(out), 1);
  console.log(offerList);
  offerList.push({
    title: out.title,
    description: out.description || null,
    date: out.date,
    tags: out.tags,
    author: out.author,
    authorid: out.authorid,
    email: out.email,
    comments: out.comments + 1 || 0,
    id: out.id,
    type: out.type,
  });

  await keyv.set('offer-list', offerList);
  const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  hook.send(`New Comment: ${out.title}`);
  res.json(offerList);
});

router.post('/offer/edit', async (req, res) => {
  let offerList = (await keyv.get('offer-list')) || [];
  let out = offerList.find(({ id }) => id === req.body.id);
  offerList.splice(offerList.indexOf(out), 1);
  offerList.push({
    title: req.body.title,
    description: req.body.description || null,
    date: out.date,
    tags: req.body.tags,
    author: out.author,
    authorid: out.authorid,
    email: out.email,
    comments: out.comments || 0,
    id: out.id,
    type: out.type,
    skills: out.skills,
  });

  const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  hook.send(`Post changed: ${req.body.title}`);

  await keyv.set('offer-list', offerList);
  res.json(offerList);
});

router.post('/offer/remove', async (req, res) => {
  const offerList = (await keyv.get('offer-list')) || [];
  let toRemove = offerList.find((block) => block.id === req.body.id);
  offerList.splice(offerList.indexOf(toRemove), 1);
  await keyv.set('offer-list', offerList);
  const hook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

  hook.send(`Post removed: ${block.id}`);
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

router.get('/counter', async (req, res) => {
  const counter = (await keyv.get('offer-count')) || 0;
  res.json({ counter });
});

module.exports = router;
