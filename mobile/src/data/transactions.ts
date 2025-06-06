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
    {
    id: '3',
    counterparty: 'Alice\'s Coffee',
    category: 'Coffee',
    date: '01 jun 2025',
    amount: '-4€',
    type: 'sent',
  },
  {
    id: '4',
    counterparty: 'Online Store',
    category: 'Shopping',
    date: '31 may 2025',
    amount: '-79€',
    type: 'sent',
  },
  {
    id: '5',
    counterparty: 'Freelance Client',
    category: 'Freelance',
    date: '30 may 2025',
    amount: '450€',
    type: 'received',
  },
  {
    id: '6',
    counterparty: 'Gym Co.',
    category: 'Fitness',
    date: '29 may 2025',
    amount: '-35€',
    type: 'sent',
  },
  {
    id: '7',
    counterparty: 'Spotify',
    category: 'Entertainment',
    date: '28 may 2025',
    amount: '-10€',
    type: 'sent',
  },
  {
    id: '8',
    counterparty: 'Electric Co.',
    category: 'Utilities',
    date: '27 may 2025',
    amount: '-60€',
    type: 'sent',
  },
];
