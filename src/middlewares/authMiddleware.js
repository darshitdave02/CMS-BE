const axios = require('axios');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ message: 'missing token', validated: false });
  }
  try {
    console.log(token);
    const request = {
      baseURL: 'http://auth-server:5000',
      url: '/validate/token',
      method: 'get',
      headers: {
        authorization: token,
      },
    };
    const userData = await axios(request);
    req.id = userData.data.id;
  } catch (err) {
    console.log(err);
    res.json({ message: 'authentication issue' });
  }
  next();
};

module.exports = { validateToken };

const table = {
  name: 'Company_profile',
  columns: {
    name: 'mckinsey',
    revenue: 500,
    contact_email: 'banglore@mckinsey',
  },
};
