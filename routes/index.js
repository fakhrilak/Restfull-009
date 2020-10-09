
const express = require('express');
const router = express.Router();

const {postUser,getUser,deleteUser} = require('../controller/User')

router.get('/user',  getUser);
router.delete('/user/:id',  deleteUser);
router.post('/user',  postUser);

module.exports = router;