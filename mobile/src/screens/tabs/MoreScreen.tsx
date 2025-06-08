// src/screens/tabs/MoreScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Options Coming Soon!</Text>
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
    marginBottom: 20,
  },
});