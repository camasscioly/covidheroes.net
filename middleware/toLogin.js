const url = require('url');

module.exports = (req, res, next) => {
  if (!req.cookies.member) {
    const origin = url.format({
      protocol: req.protocol,
      host: req.get('host'),
    });
    res.redirect(`${origin}/login`);
  } else next();
};
