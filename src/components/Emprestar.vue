<template>
    <div class="container mt-5">
        <h1 class="text-white">Formulário de Empréstimo</h1>
        <form class="form" @submit.prevent="submitForm">
            <!-- Display book information -->
            <div class="mb-3">
                <h2>Livro: {{ book.titulo }}</h2>
            </div>

            <!-- Select aluno -->
            <div class="mb-3">
                <label for="alunoSelect" class="form-label">Selecione o Aluno</label><br>
                <select v-model="form.aluno_id" id="alunoSelect" class="form-select" required>
                    <option value="" disabled>Escolha o aluno</option>
                    <option v-for="aluno in alunos" :key="aluno.aluno_id" :value="aluno.aluno_id">
                        {{ aluno.nome }}
                    </option>
                </select>
            </div>

            <!-- Data de Empréstimo -->
            <div class="mb-3">
                <label for="data_emprestimo" class="form-label">Data de Empréstimo</label>
                <input type="date" class="form-control" id="data_emprestimo" v-model="form.data_emprestimo" required>
            </div>

            <!-- Data de Devolução -->
            <div class="mb-3">
                <label for="data_devolucao" class="form-label">Data de Devolução</label>
                <input type="date" class="form-control" id="data_devolucao" v-model="form.data_devolucao" required>
            </div>

            <input type="hidden" class="form-control" id="livro_id" v-model="form.livro_id" required>
            
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
    </div>
</template>

<script>
import { defineProps } from 'vue'
import axios from 'axios'

export default {
    name: 'Emprestar',
    props: {
        book: {
            type: Object,
            required: true
        },
        alunos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            form: {
                aluno_id: '',
                data_emprestimo: '',
                data_devolucao: '',
                livro_id: ''
            }
        }
    },
    methods: {
        redirectToHome() {
            this.$router.replace('/')
        },
        async submitForm() {
            this.form.livro_id = this.book.livro_id

            const response = await axios.post("http://localhost:5000/emprestar", this.form)

            if (response.data.success == true) {
                this.$swal('Bom trabalho!', 'Livro emprestado com sucesso!', 'success')
                
                this.redirectToHome()
            } else {
                this.$swal('Erro!', 'Ocorreu algum erro tente novamente!', 'error')
            }
        }
    }
}
</script>

<style scoped>
p, label {
    color: #fff
}
</style>
