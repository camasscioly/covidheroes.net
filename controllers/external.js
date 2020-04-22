const { Router } = require('express');
const router = Router();

router.get('/github', async (req, res) => {
  res.redirect(301, 'https://github.com/camasscioly/covidheroes.net');
});

router.get('/producthunt', async (req, res) => {
  res.redirect(
    301,
    'https://www.producthunt.com/posts/covid-heroes?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-covid-heroes'
  );
});

router.get('/instagram', async (req, res) => {
  res.redirect(301, 'https://instagram.com/covid_heroes_official');
});

router.get('/gofundme', async (req, res) => {
  res.redirect(
    301,
    'https://www.gofundme.com/f/face-shields-and-glasses-for-front-lines?utm_source=customer&utm_medium=email&utm_campaign=p_cf+share-flow-1'
  );
});

module.exports = router;
