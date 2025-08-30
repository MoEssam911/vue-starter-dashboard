<template>
  <div>
    <h3 class="text-lg font-medium mb-2">Input Field</h3>
    <InputText v-model="model" type="text" placeholder="Enter something" />
  </div>
</template>

<script setup>
import { InputText } from 'primevue'

const model = defineModel("test")
</script>
