export interface Goal {
  id: string;
  /** Name/description of the saving goal */
  name: string;
  /** Current amount saved towards the goal */
  current: number;
  /** Target amount for the goal */
  target: number;
}

export const dummyGoals: Goal[] = [
  { id: '1', name: 'Emergency Fund', current: 250, target: 1000 },
  { id: '2', name: 'Vacation Trip', current: 600, target: 2500 },
  { id: '3', name: 'New Phone', current: 400, target: 800 },
];

