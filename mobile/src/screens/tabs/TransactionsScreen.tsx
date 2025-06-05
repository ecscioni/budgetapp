import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactions as initialTransactions, Transaction } from '../../data/transactions';

export const TransactionsScreen = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(initialTransactions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempCategory, setTempCategory] = useState('');

  const handleDelete = (id: string) => {
    setTransactionList(prev => prev.filter(t => t.id !== id));
  };

  const startEditing = (id: string, category: string) => {
    setEditingId(id);
    setTempCategory(category);
  };

  const saveCategory = (id: string) => {
    setTransactionList(prev => prev.map(t => (t.id === id ? { ...t, category: tempCategory } : t)));
    setEditingId(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TRANSACTIONS</Text>
      {transactionList.map(transaction => (
        <View key={transaction.id} style={styles.transactionItem}>
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
          {editingId === transaction.id ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.categoryInput}
                value={tempCategory}
                onChangeText={setTempCategory}
                placeholder="Category"
                placeholderTextColor="gray"
              />
              <TouchableOpacity style={styles.saveButton} onPress={() => saveCategory(transaction.id)}>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingId(null)}>
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => startEditing(transaction.id, transaction.category)}>
                <Text style={styles.actionText}>Categorize</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(transaction.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
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
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
});
