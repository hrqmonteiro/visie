const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPersons = (req, res, next) => {
  Post.find()
    .then((persons) => {
      res.status(200).json({ message: 'Fetched persons.', posts: persons })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getPerson = (req, res, next) => {
  const personId = req.params.personId

  Post.findById(personId)
    .then((person) => {
      if (!person) {
        const error = new Error('Could not find person.')
        error.statusCode = 404
        throw Error
      }
      res.status(200).json({ message: 'Persons fetched.', post: person })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.postPerson = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!')
    error.statusCode = 422
    throw error
  }

  const nome = req.body.nome
  const rg = req.body.rg
  const cpf = req.body.cpf
  const dataNascimento = req.body.dataNascimento
  const dataAdmissao = req.body.dataAdmissao

  const post = new Post({
    nome: nome,
    rg: rg,
    cpf: cpf,
    dataNascimento: dataNascimento,
    dataAdmissao: dataAdmissao,
  })

  post
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Post created succesfully!',
        post: result,
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updatePerson = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!')
    error.statusCode = 422
    throw error
  }

  const personId = req.params.personId
  const nome = req.body.nome
  const rg = req.body.rg
  const cpf = req.body.cpf
  const dataNascimento = req.body.dataNascimento
  const dataAdmissao = req.body.dataAdmissao

  Post.findById(personId)
    .then((person) => {
      if (!person) {
        const error = new Error('Could not find person.')
        error.statusCode = 404
        throw Error
      }
      person.nome = nome
      person.rg = rg
      person.cpf = cpf
      person.dataNascimento = dataNascimento
      person.dataAdmissao = dataAdmissao
      return person.save()
    })
    .then((result) => {
      res.status(200).json({ message: 'Person updated!', post: result })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deletePerson = (req, res, next) => {
  const personId = req.params.personId

  Post.findById(personId)
    .then((person) => {
      if (!person) {
        const error = new Error('Could not find person.')
        error.statusCode = 404
        throw Error
      }
      return Post.findByIdAndRemove(personId)
    })
    .then((result) => {
      console.log(result)
      res.status(200).json({ message: 'Person was deleted successfully!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
