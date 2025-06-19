import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Card {
  id: string;
  cardNumber?: string;
  holderName?: string;
  balance?: string;
  currency?: string;
  last4?: string;
  expiry?: string;
  cvc?: string;
  imageUrl?: string;
  isAddCard?: boolean;
}

interface CardsContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id'>) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

const initialCards: Card[] = [
  {
    id: '1',
    cardNumber: '1234 1234 1234 1234',
    holderName: 'Jonh Doe',
    balance: '●●●●●●●●',
    currency: 'AMD',
    last4: '3567',
    expiry: '02/25',
    cvc: '123',
    imageUrl: 'https://imgur.com/3u4JHkm.png',
  },
  {
    id: 'add',
    imageUrl: 'https://imgur.com/g68oGmZ.png',
    isAddCard: true,
  },
];

export const CardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (cardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards(prevCards => [...prevCards.slice(0, -1), newCard, prevCards[prevCards.length - 1]]);
  };

  const removeCard = (id: string) => {
    setCards(prevCards => {
      const filtered = prevCards.filter(card => card.id !== id && !card.isAddCard);
      const addCard = prevCards.find(card => card.isAddCard);
      return addCard ? [...filtered, addCard] : filtered;
    });
  };

  const updateCard = (id: string, updates: Partial<Card>) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, ...updates } : card
      )
    );
  };

  return (
    <CardsContext.Provider value={{ cards, addCard, removeCard, updateCard }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}; 