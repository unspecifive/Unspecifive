module.exports = {
  db: {
    uri: 'mongodb://CEN3031:CEN3031TA@ds255332.mlab.com:55332/bootcamp3', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080,
  jwtKey: "secret_boi"
};