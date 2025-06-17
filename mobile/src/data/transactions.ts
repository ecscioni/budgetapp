export interface Transaction {
  id: string;
  counterparty: string;
  category: string;
  /** Additional information about the transaction */
  description: string;
  date: string;
  amount: string;
  type: 'sent' | 'received';
  /** Whether the transaction has been archived */
  archived?: boolean;
}

export const transactions: Transaction[] = [
  {
    id: '1',
    counterparty: 'John Doe',
    category: 'Bills',
    description: 'Tuition payment',
    date: '03 Jun 2025',
    amount: '-59€',
    type: 'sent',
    archived: false,
  },
  {
    id: '2',
    counterparty: 'Fontys',
    category: 'Savings',
    description: 'Monthly salary',
    date: '02 Jun 2025',
    amount: '1000€',
    type: 'received',
    archived: false,
  },
  {
    id: '3',
    counterparty: 'Alice\'s Coffee',
    category: 'Groceries',
    description: 'Morning coffee',
    date: '01 Jun 2025',
    amount: '-4€',
    type: 'sent',
    archived: false,
  },
  {
    id: '4',
    counterparty: 'Online Store',
    category: 'Groceries',
    description: 'Online shopping',
    date: '31 May 2025',
    amount: '-79€',
    type: 'sent',
    archived: false,
  },
  {
    id: '5',
    counterparty: 'Freelance Client',
    category: 'Investments',
    description: 'Invoice payment',
    date: '30 May 2025',
    amount: '450€',
    type: 'received',
    archived: false,
  },
  {
    id: '6',
    counterparty: 'Gym Co.',
    category: 'Bills',
    description: 'Gym membership',
    date: '29 May 2025',
    amount: '-35€',
    type: 'sent',
    archived: false,
  },
  {
    id: '7',
    counterparty: 'Spotify',
    category: 'Bills',
    description: 'Subscription fee',
    date: '28 May 2025',
    amount: '-10€',
    type: 'sent',
    archived: false,
  },
  {
    id: '8',
    counterparty: 'Electric Co.',
    category: 'Bills',
    description: 'Electric bill',
    date: '27 May 2025',
    amount: '-60€',
    type: 'sent',
    archived: false,
  },
];
