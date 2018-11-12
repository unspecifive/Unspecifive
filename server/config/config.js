module.exports = {
  db: {
    uri: 'mongodb://dbuser:unspecifivepassword1@ds040089.mlab.com:40089/unspecifive',
  },
  port: process.env.PORT || 8080,
  jwtKey: "secret_boi"
};