const express = require('express');
const router = express.Router();
const ctrlPets = require('../controllers/furfriend');


router
  
  //https://api.petfinder.com/v2/pet?type=dog&breed=
  .route('')
  .get(ctrlPets.Searchinfo);

module.exports = router;