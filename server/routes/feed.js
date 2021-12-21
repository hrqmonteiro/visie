const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

// GET /feed/persons GET PERSONS - fetch todas as pessoas
router.get('/persons', feedController.getPersons)

// GET / feed/person/id GER PERSON - pessoa individual
router.get('/person/:personId', feedController.getPerson)

// POST /feed/person CREATE PERSON - criar pessoa
router.post('/person', feedController.postPerson)

// PUT /feed/person/id UPDATE PERSON - atualizar a pessoa
router.put('/person/:personId', feedController.updatePerson)

// DELETE /feed/person/id - deletar a pessoa
router.delete('/person/:personId', feedController.deletePerson)

module.exports = router
