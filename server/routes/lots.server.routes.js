const express   = require('express'),
      router    = express.Router(),
      lots      = require('../controllers/lots.server.controller'),
      users     = require('../controllers/users.server.controller');


router.route('/getAllLots')
    .get(lots.findAll);

//anything declared after the following line will use the token authentication/parsing thing
router.use(users.authenticate_token);

router.route('/updateFullness/:lotCode')
    .put(lots.updateFullness);

router.route('/create')
    .post(lots.create);

router.route('/getLotsByFilter')
    .post(lots.getLotsByFilters);

router.route('/getLotByCode/:lotCode')
    .get(lots.getLot);

//middleware to retrieve the lot by its lotCode when a request has that parameter
router.param('lotCode', lots.lotByCode);

module.exports = router;