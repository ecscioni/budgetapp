import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactions as initialTransactions, Transaction } from '../../data/transactions';

export const TransactionsScreen = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [tempCategory, setTempCategory] = useState('');

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setTempCategory(transaction.category);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setTempCategory('');
  };

  const handleDelete = (id: string) => {
    setTransactionList(prev => prev.filter(t => t.id !== id));
    closeModal();
  };

  const saveCategory = () => {
    if (!selectedTransaction) return;
    setTransactionList(prev =>
      prev.map(t => (t.id === selectedTransaction.id ? { ...t, category: tempCategory } : t))
    );
    closeModal();
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>TRANSACTIONS</Text>
        {transactionList.map(transaction => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionItem}
            onPress={() => openModal(transaction)}
          >
            <View
              style={[
                styles.transactionIconContainer,
                transaction.type === 'sent' ? styles.sentIcon : styles.receivedIcon,
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
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.type === 'sent' ? styles.sentAmount : styles.receivedAmount,
              ]}
            >
              {transaction.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal transparent animationType="slide" visible={!!selectedTransaction}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <Text style={styles.modalTitle}>Edit Transaction</Text>
                <Text style={styles.modalCounterparty}>{selectedTransaction.counterparty}</Text>
                <TextInput
                  style={styles.categoryInput}
                  value={tempCategory}
                  onChangeText={setTempCategory}
                  placeholder="Category"
                  placeholderTextColor="gray"
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.saveButton} onPress={saveCategory}>
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(selectedTransaction.id)}
                  >
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.actionText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  saveButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#FF5555',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  categoryInput: {
    flex: 1,
    backgroundColor: '#3a3a3a',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  flexContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: '#66BB6A',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCounterparty: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
});
