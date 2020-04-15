const { Router } = require('express');
const bcrypt = require('bcrypt');
const makeID = require('./../middleware/makeID.js');
const Keyv = require('keyv');
const csrf = require('csurf');

const Mailgun = require('mailgun-js');
const mailgun = Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: 'mg.covidheroes.net' });

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
        const data = {
          from: 'Aiden from COVID Heroes <aiden@mg.covidheroes.net>',
          to: email,
          subject: 'Welcome to COVID Heroes 👋',
          html: `
            <!doctype html> <html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/metropolis" type="text/css"/> <title>COVID Heroes</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: "MetropolisRegular" !important; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; } /* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #6c63ff; } .btn-primary a { background-color: #6c63ff; border-color: #6c63ff; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #6b63ffbb !important; } .btn-primary a:hover { background-color: #6b63ffbb !important; border-color: #6b63ffbb !important; } } </style> </head> <body class=""> <span class="preheader">I'm Aiden, I'm the Product Manager for COVID Heroes. I'll be sending you some helpful messages over the coming weeks to make sure you get the most out of COVID heroes: the best way to help during this crisis.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main" style="border-top: 3px solid #6b63ffbb"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <h2>Hi ${name}, welcome to COVID Heroes!</h2> <p>I'm Aiden, I'm the Product Manager for COVID Heroes. I'll be sending you some helpful messages over the coming weeks to make sure you get the most out of COVID heroes: the best way to help during this crisis. </p> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td><a href="https://covidheroes.net/submissions" target="_blank">Go to homepage</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p>💡<i> And if you have any questions while getting set up, just get in touch.</i></p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Copyright © 2020 All Rights Reserved by COVID Heroes.</span> <br> Don't like these emails? <a>Unsubscribe</a>. </td> </tr> </table> </div> <!-- END FOOTER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body> </html>
          `,
        };
        mailgun.messages().send(data, (err, body) => {
          if (err) return console.error(err);
          console.log(body);
        });
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
  let offerList = (await keyv.get('offer-list')) || [];
  let userList = (await keyv.get('user-list')) || [];
  let counter = (await keyv.get('offer-count')) || 0;
  let recipients = [];
  let id = makeID(15);
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
  });

  for (let u of userList) {
    const user = await keyv.get(u[1]);
    recipients.push(user.email);
  }

  const data = {
    from: 'COVID Heroes <aiden@mg.covidheroes.net>',
    to: recipients,
    subject: `❤️ ${req.body.author} is ${req.body.type}ing help!`,
    html: `
      <!doctype html> <html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/metropolis" type="text/css"/> <title>COVID Heroes</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: "MetropolisRegular" !important; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; } /* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #6c63ff; } .btn-primary a { background-color: #6c63ff; border-color: #6c63ff; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #6b63ffbb !important; } .btn-primary a:hover { background-color: #6b63ffbb !important; border-color: #6b63ffbb !important; } } </style> </head> <body class=""> <span class="preheader">Attention! ${req.body.author} needs your help!</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main" style="border-top: 3px solid #6b63ffbb"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <h2>${req.body.author} is ${req.body.type}ing ${req.body.title}</h2> <p><b>Dropoff</b>: ${req.body.description}</p> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td><a href="https://app.covidheroes.net/submissions/open?id=${id}" target="_blank">Go to submission</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Copyright © 2020 All Rights Reserved by COVID Heroes.</span> <br> Don't like these emails? <a>Unsubscribe</a>. </td> </tr> </table> </div> <!-- END FOOTER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body> </html>
    `,
  };
  mailgun.messages().send(data, (err, body) => {
    if (err) return console.error(err);
    console.log(body);
  });
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

router.get('/counter', async (req, res) => {
  const counter = (await keyv.get('offer-count')) || 0;
  res.json({ counter });
});

module.exports = router;
