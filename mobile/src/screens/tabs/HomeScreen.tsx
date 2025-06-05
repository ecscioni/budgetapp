import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { transactions } from '../../data/transactions';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

//  Define tab names and types
type TabParamList = {
  Home: undefined;
  Transactions: undefined;
  Cards: undefined;
  Statistics: undefined;
  Profile: undefined;
};

// Define the prop type for navigation
type HomeScreenProps = {
  navigation: BottomTabNavigationProp<TabParamList, 'Home'>;
};

// Main HomeScreen component
export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
        <Text style={styles.headerTitle}>HOME</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </View>
      </View>

      {/* Credit Card Section */}
      <View style={styles.cardSection}>
        <Image
          source={{ uri: 'https://imgur.com/3u4JHkm.png' }}
          style={styles.creditCardImage}
          resizeMode="contain"
        />
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="cash-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>Quick Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="repeat" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>New Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="grid-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

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
              <Text style={styles.transactionDescription}>
                {transaction.type === 'sent'
                  ? `To ${transaction.counterparty}`
                  : `From ${transaction.counterparty}`} • {transaction.category}
              </Text>
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
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
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
  transactionsSection: {},
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BB6A',
  },
  viewAllText: {
    fontSize: 14,
    color: 'gray',
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
    height: 200,
    borderRadius: 15,
  },
});
