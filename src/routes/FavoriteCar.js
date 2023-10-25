const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/FavoriteCarController');

router.get('/list/:userId' ,controller.getfavoriteCar);
router.get('/find/:userId/:carId' ,controller.findFavoriteCar);
router.post('/add', controller.createfavoriteCar);
router.delete('/delete/:userId/:carId', controller.deleteFavoriteCar);

module.exports = router;