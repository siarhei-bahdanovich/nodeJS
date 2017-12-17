handle = (err, response, body, res) => {
  if (err) {
    return res.send(err);
  }

  if (response.statusCode !== 200) {
    return res.status(response.statusCode).send();
  }

  res.json(JSON.parse(body || '[]'));
};

module.exports = handle;