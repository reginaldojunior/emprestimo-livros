<template>
  <main>
    <!-- Pass the books ref directly without curly braces -->
    <Emprestar :book="book" :alunos="alunos" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Emprestar from '../components/Emprestar.vue'

const book = ref([])
const alunos = ref([])

async function fetchInitialBook(id) {
  try {
    const response = await axios.get('http://localhost:5000/livro/' + id)
    book.value = response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

async function fetchAlunos() {
  try {
    const response = await axios.get('http://localhost:5000/alunos')
    alunos.value = response.data
  } catch (error) {
    console.error('Error fetching alunos:', error)
  }
}

onMounted(async () => {
  const route = useRoute()
  const bookId = route.params.id
  
  await fetchInitialBook(bookId)
  await fetchAlunos()
})
</script>
