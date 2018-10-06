const rawBody = () => (req, res, buf) => {
  req.rawBody = buf;
};

module.exports = {
  rawBody,
};
