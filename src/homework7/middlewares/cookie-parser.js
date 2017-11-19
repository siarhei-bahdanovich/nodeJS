const cookieParser = (req, res, next) => {
  console.log('Cookie parser middleware..');
  let parsedCookies = {};

  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach((cookie) => {
      let parts = cookie.split('=');
      parsedCookies[parts.shift().trim()] = decodeURIComponent(parts.join('='));
    });

    req.parsedCookies = parsedCookies;
  }

  next();
};

export default cookieParser;