<template>
  <main>
    <!-- Pass the books ref directly without curly braces -->
    <Livros :books="books" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Livros from '../components/Livros.vue'

const books = ref([])

async function fetchInitialAllBooks() {
  try {
    const response = await axios.get('http://localhost:5000/livros')
    books.value = response.data
  } catch (error) {
    console.error('Error fetching cat facts:', error)
  }
}

// Fetch data when component is mounted
onMounted(async () => {
  await fetchInitialAllBooks()
})
</script>
