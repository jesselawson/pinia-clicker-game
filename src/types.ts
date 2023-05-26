export type Cost = {
  [key: string]: number;
} & {
  energy?: number;
  capacitors?: number;
  circuits?: number;
}

export type BaseCosts = {
  [key: string]: Cost;
} & {
  energy?: Cost;
  capacitors: Cost;
  circuits: Cost;
}

export type GameState = {
  [key: string]: number;
} & {
  energy: number;
  capacitors: number;
  circuits: number;
  costMultiplier: number;
  baseCosts: {
    capacitors: Cost;
    circuits: Cost;
  };
};