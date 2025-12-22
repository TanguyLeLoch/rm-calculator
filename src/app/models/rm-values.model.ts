export interface RmValue {
  value: number;
  color: string;
  reps: number;
  weight: number;
  textColor: string;
}

export interface RmCalculatorInput {
  lastWeight: number;
  lastReps: number;
  increment: number;
  minRep: number;
  maxRep: number;
  isBrzycki: boolean;
}
