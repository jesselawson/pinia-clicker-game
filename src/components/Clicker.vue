<template>
    <div>
      <button @click="addEnergy">Generate {{ energyPerClick() }} Energy</button>
    </div>
</template>
  
<script lang="ts">
import { useStore } from '@/stores/gamestate';

export default {
    name: 'Clicker',
    setup() {
        // In our component's setup() method, instantiate a 
        // variable to hold the current state of the store:
        const store = useStore()

        // Setup methods that can be called in the template
        // (see that @click="addEnergy" in the template?) that 
        // call our store's getters:
        const addEnergy = () => {
            store.generateEnergy()
        }

        const generatePassiveEnergy = () => {
            store.generateEnergy(store.energyPerSecond)
        }

        const energyPerClick = () => {
            return store.energyPerClick
        }
        
        return {
            addEnergy,
            generatePassiveEnergy,
            energyPerClick
        }
    },

    /*created() {
        setInterval(() => {
            this.generatePassiveEnergy()
        }, 1000)
    }*/
}
</script>
  