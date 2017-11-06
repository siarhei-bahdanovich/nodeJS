const queryStringParser = (req, res, next) => {
  console.log('Query string parser middleware..');
  let parsedQuery = {};

  req.url.replace('/?', '').split('&').forEach((query) => {
    let parts = query.split('=');
    parsedQuery[parts.shift().trim()] = decodeURIComponent(parts.join('='));
  });

  req.parsedQuery = parsedQuery;
  next();
};

export default queryStringParser;