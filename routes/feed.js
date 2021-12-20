const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

// GET /feed/persons GET PERSONS
router.get('/persons', feedController.getPersons)

// GET / feed/person/id GER PERSON
router.get('/person/:personId', feedController.getPerson)

// POST /feed/person CREATE PERSON
router.post('/person', feedController.postPerson)

// PUT /feed/person/id UPDATE PERSON
router.put('/person/:personId', feedController.updatePerson)

// DELETE /feed/person/id
router.delete('/person/:personId', feedController.deletePerson)

module.exports = router
