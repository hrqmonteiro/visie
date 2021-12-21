<template>
  <div class="w-full mx-auto">
    <div
      class="bg-white w-full shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form @submit.prevent="addPerson" class="space-y-6" action="#">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">
          Preencha os dados para adicionar uma pessoa à plataforma:
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
          Criar
        </button>
        <br />
        <span v-if="showSuccessMessage">Adicionado com sucesso!</span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      rg: '',
      cpf: '',
      dataAdmissao: new Date(),
      dataNascimento: new Date(),
      error: null,
      invalidInput: false,
      showSuccessMessage: false,
    }
  },
  methods: {
    addPerson() {
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
      fetch('http://localhost:3000/feed/person', {
        method: 'POST',
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
  },
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
