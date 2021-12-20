const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

// GET /feed/pessoas
router.get('/pessoas', feedController.getPeople)

// POST /feed/post
router.post('/post', feedController.postPeople)

module.exports = router
