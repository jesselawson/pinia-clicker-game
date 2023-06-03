<script setup lang="ts">
import { gameStateStore } from '@/stores/gamestate';

const gameState = gameStateStore();
</script>

<template>
    <div>
      <button @click="gameState.generateEnergy()">Generate {{ gameState.energyPerClick }} Energy</button>
    </div>
</template>