import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { transactions as initialTransactions, Transaction } from '../../data/transactions';

const CATEGORIES = ['Groceries', 'Bills', 'Investments', 'Savings'];

export const TransactionsScreen = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    initialTransactions.filter(t => !t.archived)
  );
  const [archivedTransactions, setArchivedTransactions] = useState<Transaction[]>(
    initialTransactions.filter(t => t.archived)
  );
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [tempCategory, setTempCategory] = useState('');

  const handleDelete = (id: string) => {
    setTransactionList(prev => prev.filter(t => t.id !== id));
    setSelectedTransaction(null);
  };

  const handleArchive = (id: string) => {
    setTransactionList(prev => {
      const archived = prev.find(t => t.id === id);
      if (archived) {
        setArchivedTransactions(a => [...a, { ...archived, archived: true }]);
      }
      return prev.filter(t => t.id !== id);
    });
  };

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setTempCategory(transaction.category);
  };

  const saveCategory = () => {
    if (!selectedTransaction) return;
    setTransactionList(prev =>
      prev.map(t => (t.id === selectedTransaction.id ? { ...t, category: tempCategory } : t))
    );
    setSelectedTransaction(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>TRANSACTIONS</Text>
        {CATEGORIES.map(category => {
          const items = transactionList.filter(t => t.category === category);
          if (items.length === 0) return null;
          return (
            <View key={category}>
              <Text style={styles.categoryHeader}>{category}</Text>
              {items.map(transaction => (
                <Swipeable
                  key={transaction.id}
                  renderLeftActions={() => (
                    <TouchableOpacity
                      style={[styles.swipeAction, styles.archiveAction]}
                      onPress={() => handleArchive(transaction.id)}
                    >
                      <Ionicons name="archive" size={24} color="#fff" />
                    </TouchableOpacity>
                  )}
                  renderRightActions={() => (
                    <TouchableOpacity
                      style={[styles.swipeAction, styles.deleteAction]}
                      onPress={() => handleDelete(transaction.id)}
                    >
                      <Ionicons name="trash" size={24} color="#fff" />
                    </TouchableOpacity>
                  )}
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
                {CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryOption,
                      tempCategory === cat && styles.categoryOptionActive,
                    ]}
                    onPress={() => setTempCategory(cat)}
                  >
                    <Text style={styles.actionText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.saveButton} onPress={saveCategory}>
                  <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(selectedTransaction.id)}>
                  <Text style={styles.actionText}>Delete</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#66BB6A',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
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
  archiveAction: {
    backgroundColor: '#888',
    borderRadius: 10,
  },
  deleteAction: {
    backgroundColor: '#FF5555',
    borderRadius: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    elevation: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    borderRadius: 20,           // more rounded corners
    width: '90%',               // wider modal
    minHeight: 250,             // taller modal
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
    marginBottom: 10,
  },
  categoryOption: {
    backgroundColor: '#3a3a3a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    marginRight: 6,
  },
  categoryOptionActive: {
    backgroundColor: '#66BB6A',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    elevation: 4,
  },
});
