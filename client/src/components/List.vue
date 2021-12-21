<template>
  <section class="grid grid-cols-1">
    <div class="w-full py-8 flex flex-wrap justify-center items-center">
      <div class="w-full flex justify-between">
        <h2 class="lg:ml-9 ml-4 text-4xl font-medium">Pessoas:</h2>
        <button
          @click="setAddPerson"
          class="rounded-full w-10 h-10 shadow-lg bg-accent hover:bg-accent-focus transition-all duration-200 text-white mr-9"
        >
          {{ addPerson ? '-' : '+' }}
        </button>
      </div>
      <div class="w-full flex">
        <div
          class="w-full lg:ml-9 ml-4 py-6 transition-all duration-200"
          v-if="addPerson"
        >
          <form-add></form-add>
        </div>
      </div>
      <ul class="w-full py-8">
        <li
          class="rounded-lg shadow-md border-l-4 mb-4 border-accent scale-95 transform transition-all duration-500 hover:scale-100"
          :key="result"
          v-for="result in results"
        >
          <div
            class="lg:h-24 py-2 px-6 flex lg:flex-nowrap flex-wrap items-center justify-between"
          >
            <div class="w-full">
              <div class="w-full grid grid-cols-1">
                <p class="text-xl font-medium">
                  {{ result.nome }}
                </p>
                <p class="text-xs text-gray-700">
                  <span class="font-bold">RG:</span> {{ result.rg }}
                </p>
                <p class="text-xs text-gray-700">
                  <span class="font-bold">CPF:</span>
                  {{ result.cpf }}
                </p>
              </div>
            </div>
            <div class="w-full flex justify-between">
              <div class="w-1/2 flex items-center">
                <div class="grid grid-cols-1">
                  <p class="text-xs font-medium">
                    <span class="text-xs font-bold">Data de Nascimento:</span>
                    {{ format(new Date(result.dataNascimento), 'dd/MM/yyyy') }}
                  </p>
                  <p class="text-xs font-medium text-gray-700">
                    <span class="font-bold">Data de Admissão:</span>
                    {{ format(new Date(result.dataAdmissao), 'dd/MM/yyyy') }}
                  </p>
                  <p class="text-xs font-medium text-gray-700">
                    <span class="font-bold">Criado em:</span>
                    {{ format(new Date(result.createdAt), 'dd/MM/yyyy') }} às
                    {{ format(new Date(result.createdAt), 'hh:mm') }}
                  </p>
                  <p class="text-xs font-medium text-gray-700">
                    <span class="font-bold">Modificado em:</span>
                    {{ format(new Date(result.updatedAt), 'dd/MM/yyyy') }} às
                    {{ format(new Date(result.updatedAt), 'hh:mm') }}
                  </p>
                </div>
              </div>
              <div class="w-1/2 flex items-center justify-end px-6">
                <button
                  @click="
                    this.editPerson.includes(result.id)
                      ? removeEditPerson(result.id)
                      : setEditPerson(result.id)
                  "
                  class="mx-2"
                >
                  Editar
                </button>
                <button @click="deletePersonById(result.id)" class="mx-2">
                  Deletar
                </button>
              </div>
            </div>
          </div>
          <div
            class="py-8 px-6 flex items-center justify-between"
            v-if="editPerson.includes(result.id)"
          >
            <div class="w-full">
              <form
                @submit.prevent="editPersonById(result.id)"
                class="space-y-6"
                action="#"
              >
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                  Digite os dados para alterar o cadastro:
                </h3>
                <div>
                  <label
                    for="name"
                    class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >Nome:</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model.trim="nome"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="rg"
                    class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >RG:</label
                  >
                  <input
                    type="number"
                    name="rg"
                    id="rg"
                    v-model.trim="rg"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="RG"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="cpf"
                    class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >CPF:</label
                  >
                  <input
                    type="number"
                    name="cpf"
                    id="cpf"
                    v-model.trim="cpf"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="CPF"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="datanasc"
                    class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >Data de Nascimento:</label
                  >
                  <input
                    type="date"
                    name="datanasc"
                    id="datanasc"
                    v-model.trim="dataNascimento"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="dataadmis"
                    class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >Data de Admissão:</label
                  >
                  <input
                    type="date"
                    name="dataadmis"
                    id="dataadmis"
                    v-model.trim="dataAdmissao"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-accent hover:bg-accent-focus focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-200"
                >
                  Atualizar
                </button>
                <br />
                <span v-if="showSuccessMessage">Adicionado com sucesso!</span>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      format,
      addPerson: false,
      editPerson: [],
      results: [],
      deleteResult: null,
    }
  },
  methods: {
    getPersons() {
      fetch('http://localhost:3000/feed/persons')
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const results = []
          const persons = data.posts
          for (const id in persons) {
            results.push({
              id: persons[id]._id,
              nome: persons[id].nome,
              rg: persons[id].rg,
              cpf: persons[id].cpf,
              dataAdmissao: persons[id].dataAdmissao,
              dataNascimento: persons[id].dataNascimento,
              createdAt: persons[id].createdAt,
              updatedAt: persons[id].updatedAt,
            })
          }
          this.results = results
        })
    },
    editPersonById(personId) {
      const id = personId

      if (
        this.nome === '' ||
        this.rg === '' ||
        this.cpf === '' ||
        this.dataAdmissao === '' ||
        this.dataNascimento === ''
      ) {
        this.invalidInput = true
        return
      }
      this.invalidInput = false
      this.error = null
      fetch(`http://localhost:3000/feed/person/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: this.nome,
          rg: this.rg,
          cpf: this.cpf,
          dataNascimento: this.dataNascimento,
          dataAdmissao: this.dataAdmissao,
        }),
      })
        .then((res) => {
          if (res.ok) {
            this.showSuccessMessage = true
            setTimeout(window.location.reload(), 1000)
          } else {
            throw new Error('Não foi possível salvar!')
          }
        })
        .catch((err) => {
          console.log(err)
          this.error = err.message
        })

      this.nome = ''
      this.rg = ''
      this.cpf = ''
      this.dataNascimento = 0
      this.dataAdmissao = 0
    },
    deletePersonById(personId) {
      const id = personId

      fetch(`http://localhost:3000/feed/person/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            console.log('Deletado com sucesso')
            res.json()
            setTimeout(window.location.reload(), 1000)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setAddPerson() {
      this.addPerson = !this.addPerson
    },
    setEditPerson(id) {
      this.editPerson.push(id)
    },
    removeEditPerson(id) {
      this.editPerson.pop(id)
    },
  },
  mounted() {
    this.getPersons()
  },
}
</script>
