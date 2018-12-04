const path            = require('path'),  
    express           = require('express'), 
    mongoose          = require('mongoose'),
    morgan            = require('morgan'),
    bodyParser        = require('body-parser'),
    config            = require('./config'),
    userRouter        = require('../routes/users.server.routes'),
    lotRouter         = require('../routes/lots.server.routes'),
    cors              = require('cors'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local').Strategy,
    User              = require('../models/userSchema');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri, {
    useMongoClient: true
  });

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  
  app.use(cors());

  app.use(express.static('client'));

   // Passport initialization and set up
   app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
   // Passport config
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
 
  app.use('/api/user', userRouter);
  //app.use('/api/parkingLots', parkingLotsRouter);

  app.use('/api/listings', lotRouter);

  app.route('*', function (req, res) {
    res.sendFile("/index.html");
  });
  
  return app;
};  