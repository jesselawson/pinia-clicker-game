<script setup lang="ts">
import Clicker from '@/components/Clicker.vue'
import StoreDisplay from '@/components/StoreDisplay.vue'
import { useStore } from './stores/gamestate';
import {setInterval2} from '@/helpers';
import { onMounted } from 'vue';

const gameState = useStore();

onMounted( () => {
  setInterval2(()=>{
    gameState.energy += gameState.energyPerSecond
  }, 1000);
}); 

</script>


<template>
  <div id="app">
    <Clicker/>
    <StoreDisplay :gameState="gameState"
    />
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
