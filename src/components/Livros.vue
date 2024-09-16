<template>
    <div class="container">
        <h2 class="mb-5">Livros Disponíveis</h2>

        <div class="table-responsive">
            <table class="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome do Livro</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Ano de Publicação</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr scope="row" v-for="book in books">
                      <td>
                          {{ book.livro_id }}
                      </td>
                      <td><a href="#">{{ book.titulo }}</a></td>
                      <td>
                          {{ book.autor }}
                      </td>
                      <td>
                        {{ book.ano_publicacao }}
                      </td>
                      <td>
                        <div v-if="book.disponivel == true">
                            <a :href="'/emprestar/' + book.livro_id" class="more">Emprestar</a>
                        </div>
                        <div v-else>
                            <a href="javascript:;" @click="devolver(book.livro_id)" class="more">Devolver</a>
                        </div>
                      </td>
                    </tr>                
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { defineProps } from 'vue'
import axios from 'axios'

export default {
    name: 'Emprestar',
    props: {
        books: Array
    },
    methods: {
        async devolver(id) {
            event.preventDefault();

            const result = await this.$swal({
                title: 'Tem certeza?',
                text: 'Quer realmente fazer a devolução?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, confirmar!',
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                const response = await axios.put("http://localhost:5000/devolver/" + id, {
                    'data_devolucao': this.getCurrentDate()
                })

                if (response.data.success == true) {
                    this.$swal('Bom trabalho!', 'Livro devolvido com sucesso!', 'success')
                    
                    this.redirectToHome()
                } else {
                    this.$swal('Erro!', 'Ocorreu algum erro tente novamente!', 'error')
                }
            } else {
                this.$swal('Cancelada!', 'Operação cancelada, nada aconteceu!', 'info')
            }
        },
        getCurrentDate() {
            const today = new Date()

            const yyyy = today.getFullYear()
            let mm = today.getMonth() + 1
            let dd = today.getDate()

            return yyyy + "-" + mm + "-" + dd
        }
    }
}
</script>