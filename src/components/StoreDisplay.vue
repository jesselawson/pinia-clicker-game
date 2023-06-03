<script setup lang="ts">
import { gameStateStore } from '@/stores/gamestate';

const gameState = gameStateStore();
</script>

<template>
  <div>
    <p>Energy: {{ gameState.energy }}</p>
    <p>Capacitors: {{ gameState.capacitors }}</p>
    <p>Circuits: {{ gameState.circuits }}</p>
    <p>Energy per click: {{ gameState.energyPerClick }}</p>
    <p>Energy per second: {{ gameState.energyPerSecond }}</p>
    <button @click="gameState.addCapacitor" :disabled="!gameState.canAffordCapacitor">Purchase Capacitor (
      <span v-if="gameState.nextCapacitorCost.energy !== undefined">{{ gameState.nextCapacitorCost.energy }} Energy </span>
      <span v-if="gameState.nextCapacitorCost.capacitors !== undefined">{{ gameState.nextCapacitorCost.capacitors }} Capacitors </span>
      <span v-if="gameState.nextCapacitorCost.circuits !== undefined">{{ gameState.nextCapacitorCost.circuits }} Circuits </span>
      )</button><br/>
      <button @click="gameState.addCircuit" :disabled="!gameState.canAffordCircuit">Purchase Circuit (
      <span v-if="gameState.nextCircuitCost.energy !== undefined">{{ gameState.nextCircuitCost.energy }} Energy </span>
      <span v-if="gameState.nextCircuitCost.capacitors !== undefined">{{ gameState.nextCircuitCost.capacitors }} Capacitors </span>
      <span v-if="gameState.nextCircuitCost.circuits !== undefined">{{ gameState.nextCircuitCost.circuits }} Circuits</span>
      )</button>
  </div>
</template>
