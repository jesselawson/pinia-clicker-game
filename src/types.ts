
export type Cost = {
    energy?: number;
    capacitors?: number;
    circuits?: number;
}

export type BaseCosts = {
    energy: Cost;
    capacitors: Cost;
    circuits: Cost;
}

export type GameState = {
    energy: number,
    capacitors: number,
    circuits: number,
    costMultiplier: number,
    baseCosts: {
      capacitors: Cost,
      circuits: Cost
    }
  }