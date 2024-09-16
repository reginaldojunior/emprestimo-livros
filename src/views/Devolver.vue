<template>
  <main>
    <!-- Pass the books ref directly without curly braces -->
    <Devolver :books="books" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Devolver from '../components/Devolver.vue'
</script>
