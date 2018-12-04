const express   = require('express'),
      router    = express.Router(),
      listings      = require('../controllers/lots.server.controller'),
      users     = require('../controllers/users.server.controller');


//router.route('/getAllLots')
 //   .get(lots.findAll);

 router.route('/getLotByCode/:lotCode')
     .get(listings.getLot);

//anything declared after the following line will use the token authentication/parsing thing
router.use(users.authenticate_token);
router.route('/updateFullness/:lotCode')
    .put(listings.updateFullnessOriginal);

router.route('/')
    .get(listings.list)
    .post(listings.updateFullness);

router.route('/create')
    .post(listings.create);

router.route('/getLotsByFilter')
    .post(listings.getLotsByFilters);

//middleware to retrieve the lot by its lotCode when a request has that parameter
router.param('lotCode', listings.lotByCode);

module.exports = router;
