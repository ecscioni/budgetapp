import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactions } from '../../data/transactions';

export const CategoryTransactionsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { category } = route.params;
  const items = transactions.filter(t => t.category === category);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        {items.map(transaction => (
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
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
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
        {items.length === 0 && (
          <Text style={styles.emptyText}>No transactions found.</Text>
        )}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#66BB6A',
    fontSize: 18,
    fontWeight: 'bold',
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
  emptyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

