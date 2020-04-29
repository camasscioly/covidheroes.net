const ejs = require('ejs');
const { join } = require('path');
const { minify } = require('html-minifier');

module.exports = (req, res, file, options={}) => {
  let data = {
    t: req.t,
  }
  return ejs.renderFile(join(__dirname, `./../views/${file}.ejs`), data, options, (err, content) => {
    if (err) return res.status(500).send(err);
    res.setHeader('Content-Type', 'text/html');
    res.send(
      minify(content, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      })
    );
  });
};
