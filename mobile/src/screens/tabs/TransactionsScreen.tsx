import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactions } from '../../data/transactions';

export const TransactionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TRANSACTIONS</Text>
      {transactions.map(transaction => (
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
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
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
    backgroundColor: '#323232',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
});
