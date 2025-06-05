export interface Transaction {
  id: string;
  counterparty: string;
  category: string;
  date: string;
  amount: string;
  type: 'sent' | 'received';
}

export const transactions: Transaction[] = [
  {
    id: '1',
    counterparty: 'John Doe',
    category: 'School',
    date: '03 jun 2025',
    amount: '-59€',
    type: 'sent',
  },
  {
    id: '2',
    counterparty: 'Fontys',
    category: 'Salary',
    date: '02 jun 2025',
    amount: '1000€',
    type: 'received',
  },
];
