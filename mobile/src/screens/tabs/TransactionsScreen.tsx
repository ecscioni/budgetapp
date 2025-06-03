import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const TransactionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#48BF73',
  }
}); 