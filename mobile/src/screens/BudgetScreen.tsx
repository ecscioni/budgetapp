import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const BudgetScreen = () => {
    <view style={styles.container}>
        <text style={styles.title}>
            Create budget
        </text>

    </view>
}

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