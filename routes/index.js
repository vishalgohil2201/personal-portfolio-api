var express = require('express');
var router = express.Router();
var user = require('../controller/userController');
const cors = require('cors');

router.use(cors());

router.post('/touchme', user.touchUser);
router.get('/alluser', user.allUser);

module.exports = router;
