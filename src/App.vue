<script setup lang="ts">
import Clicker from '@/components/Clicker.vue'
import StoreDisplay from '@/components/StoreDisplay.vue'

</script>

<template>
  <div id="app">
    <Clicker />
    <StoreDisplay />
  </div>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: top;
  
  height: 100vh;
}

#app > * {
  margin: 1rem;
}
</style>