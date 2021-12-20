const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    rg: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    dataNascimento: {
      type: Number,
      required: true,
    },
    dataAdmissao: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
