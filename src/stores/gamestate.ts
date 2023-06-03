import { defineStore } from 'pinia'
import type { Cost,BaseCosts,GameState } from '@/types'

const generateNextCost = (state: any, resource: string): Cost => {
  
  // Get the base cost for the resource:
  const baseCosts = state.baseCosts[resource];  
  
  // Get how many of these resources we already own:
  const currentResourceCount = state[resource];

  // Iterate over baseCosts to dynamically calculate 
  // the next cost for each cost type (e.g., energy, 
  // capacitors, circuits). The reduce function helps us 
  // accumulate the next cost values into a new `Cost`
  // object that we can then return:
  return Object.keys(baseCosts as BaseCosts).reduce(
    
    (nextCost: Cost, costKey: string) => {
      
      // Get the base cost—or, if baseCosts[costKey] is falsy, 
      // default the base cost to zero:
      const baseCost = baseCosts[costKey] || 0;

      // Calculate the next cost by multiplying the 
      // base cost by the cost multiplier raised to the 
      // power of the current resource count, and wrap it 
      // in Math.floor() to ensure the result is an integer:
      nextCost[costKey as keyof Cost] = Math.floor(
        baseCost * Math.pow(state.costMultiplier, currentResourceCount)
      );
      return nextCost;
    }, 
  {});
};

const canAffordNext = 

  // Check if the player can afford the next resource 
  // based on the current state:
  (state: GameState, resource: string): boolean => {
  
  // Generate the cost of the next resource based on the current state: 
  const nextCost = generateNextCost(state, resource);

  // Check if player has enough of each cost key:
  return Object.keys(nextCost).every(

    // For every cost key, see if the matching state key 
    // is greater than or equal (if yes, then player 
    // can afford):
    (costKey) => {
      // Get the current count of the resource, 
      // and default to zero if it doesn't exist:
      const currentResourceCount = state[costKey] || 0;

      // Get the cost of the resource, 
      // and default to zero if it doesn't exist:
      const cost = nextCost[costKey as keyof Cost] || 0;

      // Return whether the current count is 
      // greater than or equal to the cost:
      return currentResourceCount >= cost;
  });
};


export const gameStateStore = defineStore({
  id: 'gamestate',

  // Describe the initial state of our store:
  state: () => ({
    energy: 0,
    capacitors: 1,
    circuits: 0,
    costMultiplier: 1.35,
    baseCosts: {
      capacitors: {
        energy: 3
      } as Cost,
      circuits: {
        energy: 5,
        capacitors: 5
      } as Cost
    } as BaseCosts
  } as GameState),
  
  // Define our getters: 
  getters: {
    getEnergy: (state) => state.energy,
    energyPerClick: (state) => state.capacitors,
    energyPerSecond: (state) => state.circuits,
    nextResourceCost: (state) => 
      (resource:string) => generateNextCost(state, resource),
    nextCapacitorCost: (state) => generateNextCost(state, "capacitors"),
    nextCircuitCost: (state) => generateNextCost(state, "circuits"),
    canAffordCircuit: (state) => canAffordNext(state, "circuits"),
    canAffordCapacitor: (state) => canAffordNext(state, "capacitors"),
  },
  

  // Define actions that mutate state values:
  actions: {
    // If amt given, just generate that much energy.
    // Otherwise, assume click
    generateEnergy(amt?:number) {
      if(amt) {
        this.energy += amt
      } else {
        this.energy += this.energyPerClick
      }
    },
    
    addCircuit() {
      if(this.canAffordCircuit) {
        this.energy -= this.nextResourceCost("circuits")?.energy ?? 0
        this.capacitors -= this.nextResourceCost("circuits")?.capacitors ?? 0
        this.circuits++
      }
    },
    addCapacitor() {
      if(this.canAffordCapacitor) {
        this.energy -= this.nextResourceCost("capacitors")?.energy ?? 0
        this.capacitors++
      }
    }
  }
}) // end of pinia store definition
