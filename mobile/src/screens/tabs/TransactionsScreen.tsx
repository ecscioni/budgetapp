import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { transactions as initialTransactions, Transaction } from '../../data/transactions';
import SummaryCard from '../../components/SummaryCard';
import { useCards } from '../../contexts/CardsContext';

const CATEGORIES = [
  { label: 'Groceries', emoji: '🛒' },
  { label: 'Bills', emoji: '💡' },
  { label: 'Investments', emoji: '📈' },
  { label: 'Savings', emoji: '💰' },
  { label: 'Incomes', emoji: '💵' }, // auto-assigned, excluded from modal
];

export const TransactionsScreen = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    initialTransactions.filter(t => !t.archived)
  );
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [tempCategory, setTempCategory] = useState('');

  const { cards } = useCards();
  const realCards = cards.filter(card => !card.isAddCard);
  const showZero = realCards.length === 0;

  const openModal = (transaction: Transaction) => {
    if (transaction.type === 'received') return; // no modal for incomes
    setSelectedTransaction(transaction);
    setTempCategory(transaction.category);
  };

  const saveCategory = () => {
    if (!selectedTransaction) return;
    setTransactionList(prev =>
      prev.map(t =>
        t.id === selectedTransaction.id ? { ...t, category: tempCategory } : t
      )
    );
    setSelectedTransaction(null);
  };

  const getCategoryTotal = (transactions: Transaction[]) => {
    const total = transactions.reduce((sum, t) => {
      const cleaned = parseFloat(t.amount.replace('€', '').replace(',', '.'));
      return sum + cleaned;
    }, 0);
    return {
      label: total >= 0 ? `Total Gained: €${total}` : `Total Spent: €${Math.abs(total)}`,
      color: total >= 0 ? 'gray' : 'gray',
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SummaryCard transactions={transactionList} forceZero={showZero} />

        {CATEGORIES.map(({ label }) => {
          if (showZero) {
            return (
              <View key={label} style={{ marginBottom: 20 }}>
                <Text style={styles.categoryHeader}>{label}</Text>
              </View>
            );
          }
          const items = transactionList.filter(t =>
            label === 'Incomes' ? t.type === 'received' : t.category === label && t.type === 'sent'
          );
          if (items.length === 0) return null;
          const summary = getCategoryTotal(items);
          return (
            <View key={label} style={{ marginBottom: 20 }}>
              <Text style={styles.categoryHeader}>{label}</Text>
              {items.map(transaction => (
                <Swipeable
                  key={transaction.id}
                  renderLeftActions={() =>
                    transaction.type === 'sent' ? (
                      <TouchableOpacity
                        style={[styles.swipeAction, styles.modalSwipeAction]}
                        onPress={() => openModal(transaction)}
                      >
                        <Ionicons name="create-outline" size={24} color="#fff" />
                      </TouchableOpacity>
                    ) : null
                  }
                >
                  <TouchableOpacity
                    style={styles.transactionItem}
                    onPress={() => openModal(transaction)}
                  >
                    <View
                      style={[
                        styles.transactionIconContainer,
                        transaction.type === 'sent'
                          ? styles.sentIcon
                          : styles.receivedIcon,
                      ]}
                    >
                      <Ionicons
                        name={transaction.type === 'sent' ? 'arrow-up' : 'arrow-down'}
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionCounterparty}>{transaction.counterparty}</Text>
                      <Text style={styles.transactionDescription}>{transaction.description}</Text>
                      <Text style={styles.transactionCategory}>{transaction.category}</Text>
                      <Text style={styles.transactionDate}>{transaction.date}</Text>
                    </View>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.type === 'sent'
                          ? styles.sentAmount
                          : styles.receivedAmount,
                      ]}
                    >
                      {transaction.amount}
                    </Text>
                  </TouchableOpacity>
                </Swipeable>
              ))}
              <Text style={[styles.categorySummary, { color: summary.color }]}>
                {summary.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {selectedTransaction && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedTransaction.counterparty}</Text>

              <View style={styles.categorySelect}>
                {CATEGORIES.filter(c => c.label !== 'Incomes').map(({ label, emoji }) => (
                  <TouchableOpacity
                    key={label}
                    style={[
                      styles.categoryOption,
                      tempCategory === label && styles.categoryOptionActive,
                    ]}
                    onPress={() => setTempCategory(label)}
                  >
                    <Text style={styles.actionText}>
                      {emoji} {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.saveButton} onPress={saveCategory}>
                  <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedTransaction(null)}>
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 15,
    paddingTop: 40,
  },
  categoryHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  categorySummary: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'right',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIconContainer: {
    padding: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  sentIcon: {
    backgroundColor: '#444444',
  },
  receivedIcon: {
    backgroundColor: '#66BB6A',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCounterparty: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  transactionCategory: {
    color: 'gray',
    fontSize: 14,
  },
  transactionDate: {
    color: 'gray',
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sentAmount: {
    color: '#FF5555',
  },
  receivedAmount: {
    color: '#66BB6A',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 10,
  },
  modalSwipeAction: {
    backgroundColor: '#66BB6A',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    padding: 25,
    borderRadius: 20,
    width: '90%',
    minHeight: 250,
    justifyContent: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  categorySelect: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  categoryOption: {
    backgroundColor: '#3a3a3a',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  categoryOptionActive: {
    backgroundColor: '#66BB6A',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  saveButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
