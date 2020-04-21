const { Router } = require('express');
const router = Router();

router.get('/github', async (req, res) => {
  res.redirect(301, 'https://github.com/camasscioly/covidheroes.net');
});

module.exports = router;
