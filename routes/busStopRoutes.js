const express = require("express");
const busStopController = require('../controllers/busStopController');
const router = express.Router();

router.post('/api/busStops', busStopController.addNewStop);
router.post('/busStops', busStopController.createBusStop);
router.get('/busStops/:id', busStopController.getBusStop);
router.put('/busStops/:id', busStopController.updateBusStop);
router.delete('/busStops/:id', busStopController.deleteBusStop);
router.get('/busStops', busStopController.listBusStops);
module.exports = router;
