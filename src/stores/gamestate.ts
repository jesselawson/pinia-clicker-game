import { defineStore } from 'pinia'
import type { Cost,BaseCosts,GameState } from '@/types'

/*
The generateNextCost function is a utility function that 
calculates the next cost for a given resource based on the 
current state of the application. It takes two parameters: 
state and resource. state represents the current state of 
the application, which includes the resource counts, cost 
multipliers, and base costs. resource is a string indicating 
the specific resource for which we want to calculate the 
next cost.

Inside the function, we retrieve the base costs for the 
specified resource from the state object. The base costs 
represent the initial costs for each resource type. We also 
obtain the current count of the specified resource from the 
state object.

We then use the Object.keys function to iterate over the 
properties of the baseCosts object. This allows us to 
dynamically calculate the next cost for each cost type 
(e.g., energy, capacitors, circuits). The reduce function 
is used to accumulate the next cost values into a new Cost 
object.

Within the reduce function, we access each costKey, which 
represents a specific cost type (e.g., energy, capacitors, 
  circuits). We retrieve the corresponding base cost from 
  the baseCosts object using baseCosts[costKey]. If the 
  base cost is not defined (baseCosts[costKey] is falsy), 
  we default it to 0.

To calculate the next cost, we multiply the base cost by 
the cost multiplier raised to the power of the current 
resource count. The Math.pow function is used for this 
calculation. We apply Math.floor to ensure the result is 
an integer.

Finally, we assign the calculated next cost to the nextCost 
object using nextCost[costKey as keyof Cost]. Here, 
keyof Cost ensures that costKey is a valid key of the Cost 
type. The as keyword performs a type assertion, allowing us 
to assign the value to the appropriate key in the nextCost 
object.

By using this generateNextCost function, we can dynamically 
calculate the next cost for any resource type in a generic 
and reusable manner, avoiding the need for repetitive code.
*/
const generateNextCost = (state: any, resource: string): Cost => {
  const baseCosts = state.baseCosts[resource]!;
  
  const currentResourceCount = state[resource];

  return Object.keys(baseCosts as BaseCosts).reduce((nextCost: Cost, costKey: string) => {
    const baseCost = baseCosts[costKey] || 0;
    nextCost[costKey as keyof Cost] = Math.floor(
      baseCost * Math.pow(state.costMultiplier, currentResourceCount)
    );
    return nextCost;
  }, {});
};

const canAffordNext = (state: GameState, resource: string): boolean => {
  const nextCost = generateNextCost(state, resource);

  return Object.keys(nextCost).every((costKey) => {
    const currentResourceCount = state[costKey] || 0;
    const cost = nextCost[costKey as keyof Cost] || 0;
    return currentResourceCount >= cost;
  });
};

export const useStore = defineStore({
  id: 'gamestate',

  // Describe the initial state of our store:
  state: () => ({
    energy: 0,
    capacitors: 1,
    circuits: 0,
    costMultiplier: 1.35,
    baseCosts: {
      capacitors: {
        "energy": 10
      } as Cost,
      circuits: {
        "energy": 25,
        "capacitors": 10
      } as Cost
    }
  } as GameState),
  getters: {
    getEnergy(state) {
      return state.energy
    },
    energyPerClick(state) {
      return state.capacitors
    },
    energyPerSecond(state) {
      return state.circuits
    },
    nextResourceCost: (state) => (resource:string) => {
      return generateNextCost(state, resource)
    },
    canAffordCircuit: (state) => canAffordNext(state, "circuits"),
    canAffordCapacitor: (state) => canAffordNext(state, "capacitors"),
    nextCapacitorCost: (state) => generateNextCost(state, "capacitors"),
    nextCircuitCost(state) {
      return generateNextCost(state, "circuits")
    },
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
})
