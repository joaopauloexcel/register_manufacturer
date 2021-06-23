const express = require('express')
const router = express();
const controllerManufacturer = require('../controllers/index');
const cors = require('cors')

    router.options('/:id', cors()); 
	
	router.get('/list/:id?', controllerManufacturer.list);
	router.post('/create', controllerManufacturer.add);
	router.post('/edit/:id', cors(), controllerManufacturer.update);
	router.get('/delete/:id', cors(), controllerManufacturer.delete);


module.exports = router;