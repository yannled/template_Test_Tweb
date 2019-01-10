module.exports = {
  port: process.env.PORT || 2000,
  jwtOptions: {
    secret: process.env.JWT_SECRET || 'miaou',
  },
};
