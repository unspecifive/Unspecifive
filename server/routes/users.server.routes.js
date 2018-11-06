const express = require('express'),
      router  = express.Router(),
      users   = require('../controllers/users.server.controller');

router.route('/signup')
    .post(users.create);

router.route('/login')
    .post(users.login);

router.route('/delete/:userId')
    .delete(users.delete);

module.exports = router;