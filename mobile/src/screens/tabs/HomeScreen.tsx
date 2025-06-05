import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
  // TRANSACTIONS VISUALS
  const transactions = [
    { id: '1', description: 'To Jonh Doe • School', date: '03 jun 2025', amount: '-59€', type: 'sent' },
    { id: '2', description: 'From Fontys • Salary', date: '02 jun 2025', amount: '1000€', type: 'received' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
        <Text style={styles.headerTitle}>HOME</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF"/>
        </View>
      </View>

      {/* Credit Card Section */}
      <View style={styles.cardSection}>
        <Image
          source={{
            uri: 'https://imgur.com/QDiZGzg.png',
          }}
          style={styles.creditCardImage}
          resizeMode="contain"
      />
      </View>

      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="cash-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>Fund Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="repeat" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="grid-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {transactions.map(transaction => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={[styles.transactionIconContainer, transaction.type === 'sent' ? styles.sentIcon : styles.receivedIcon]}>
              <Ionicons
                name={transaction.type === 'sent' ? 'arrow-up' : 'arrow-down'}
                size={20}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[styles.transactionAmount, transaction.type === 'sent' ? styles.sentAmount : styles.receivedAmount]}>{transaction.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222', 
    padding: 15,
    paddingTop: 20, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#66BB6A', 
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  slideIndicators: {
    flexDirection: 'row',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonIconContainer: {
    backgroundColor: '#333333', 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  transactionsSection: {
   
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BB6A', // Verde
  },
  viewAllText: {
    fontSize: 14,
    color: 'gray',
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
  transactionDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  cardSection: {
    marginBottom: 20,
  },
  creditCardImage: {
    width: '100%',
    height: 150,
  },
}); 