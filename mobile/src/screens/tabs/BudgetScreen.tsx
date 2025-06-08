import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const BudgetScreen = () => {
  return ( 
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>
        Create Your First Budget
        </Text>
      </View>


      
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
    color: 'white',
    marginBottom: 20,
  },
  textBox:{
     backgroundColor: 'green',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: '80%',
    alignItems: 'flex-start',
  }
});
