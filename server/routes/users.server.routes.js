const express = require('express'),
      router  = express.Router(),
      users   = require('../controllers/users.server.controller');

router.route('/signup')
    .post(users.create);

router.route('/login')
    .post(users.login);

//anything declared after the following line will use the token authentication/parsing thing
router.use(users.authenticate_token);

router.route('/delete')
    .delete(users.delete);

router.route('/who_am_i')
    .get(users.who_am_i);
    
module.exports = router;
