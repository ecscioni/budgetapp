import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { goals } from '../../data/goals';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Define tab names and types
type TabParamList = {
  Home: undefined;
  Transactions: undefined;
  Cards: undefined;
  Statistics: undefined;
  Profile: undefined;
};

// Define stack names and types
type RootStackParamList = {
  Budget: undefined;
  Goals: undefined;
  More: undefined;
};

// Define the prop type for navigation
type HomeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

// Main HomeScreen component
const HomeScreen = ({ navigation }: { navigation: HomeScreenProps }) => {
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Budget')}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="cash-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>Create budget</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goals')}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="repeat" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>Add goals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('More')}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="grid-outline" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.buttonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Goals Progress */}
      <View style={styles.goalsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Goals Progress</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {goals.map(goal => {
          const progress = Math.min(goal.current / goal.target, 1);
          return (
            <View key={goal.id} style={styles.goalItem}>
              <Text style={styles.goalName}>{goal.name}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress * 100}%` }]}
                />
              </View>
              <Text style={styles.goalAmount}>
                {goal.current}€ / {goal.target}€
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;


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
  goalsSection: {},
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
  goalItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalAmount: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#444444',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66BB6A',
    borderRadius: 4,
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
