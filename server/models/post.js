const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    rg: {
      type: Number,
      required: true,
    },
    cpf: {
      type: Number,
      required: true,
    },
    dataNascimento: {
      type: Date,
      required: true,
    },
    dataAdmissao: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
