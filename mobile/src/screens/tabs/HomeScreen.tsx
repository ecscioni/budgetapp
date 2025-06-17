import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { dummyGoals as initialGoals, Goal } from '../../data/goals';
import { fetchGoals, createGoal as apiCreateGoal, updateGoal as apiUpdateGoal, deleteGoal as apiDeleteGoal } from '../../api/goals';
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
  const USER_ID = '1';
  const [goalList, setGoalList] = useState<Goal[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempCurrent, setTempCurrent] = useState('');
  const [tempTarget, setTempTarget] = useState('');

  // Modal state for adding new goals
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newTarget, setNewTarget] = useState('');

  useEffect(() => {
    fetchGoals(USER_ID)
      .then(setGoalList)
      .catch((e) => console.log('fetch goals error', e));
  }, []);

  const openModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setTempName(goal.name);
    setTempCurrent(goal.current.toString());
    setTempTarget(goal.target.toString());
  };

  const saveGoal = async () => {
    if (!selectedGoal) return;
    try {
      const updated = await apiUpdateGoal(selectedGoal.id, {
        name: tempName,
        current: parseFloat(tempCurrent) || 0,
        target: parseFloat(tempTarget) || 0,
      });
      setGoalList((prev) =>
        prev.map((g) => (g.id === selectedGoal.id ? updated : g))
      );
    } catch (e) {
      console.log('update goal error', e);
    }
    setSelectedGoal(null);
  };

  const addGoal = async () => {
    try {
      const created = await apiCreateGoal({
        user_id: USER_ID,
        name: newName || `Goal ${goalList.length + 1}`,
        current: parseFloat(newCurrent) || 0,
        target: parseFloat(newTarget) || 0,
      });
      setGoalList((prev) => [...prev, created]);
    } catch (e) {
      console.log('create goal error', e);
    }
    setAddModalVisible(false);
    setNewName('');
    setNewCurrent('0');
    setNewTarget('');
  };

  const deleteGoal = async (id: string) => {
    try {
      await apiDeleteGoal(id);
      setGoalList((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      console.log('delete goal error', e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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

        <TouchableOpacity style={styles.button} onPress={() => setAddModalVisible(true)}>
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
        </View>

        {goalList.map(goal => {
          const progress = Math.min(goal.current / goal.target, 1);
          const completed = progress >= 1;
          return (
            <Swipeable
              key={goal.id}
              renderRightActions={() => (
                <TouchableOpacity
                  style={[styles.swipeAction, styles.deleteSwipeAction]}
                  onPress={() => deleteGoal(goal.id)}
                >
                  <Ionicons name="trash-outline" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            >
              <TouchableOpacity
                style={[styles.goalItem, completed && styles.goalCompleted]}
                onPress={() => openModal(goal)}
              >
                <View style={styles.goalHeader}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  {completed && (
                    <Ionicons name="checkmark-circle" size={20} color="#66BB6A" />
                  )}
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progress * 100}%` }]}
                  />
                </View>
                <Text style={styles.goalAmount}>
                  {goal.current}€ / {goal.target}€
                </Text>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </View>
    </ScrollView>
    {selectedGoal && (
      <Modal visible transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Goal</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Goal Name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tempCurrent}
              onChangeText={setTempCurrent}
              placeholder="Current Amount"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tempTarget}
              onChangeText={setTempTarget}
              placeholder="Target Amount"
              placeholderTextColor="#aaa"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={saveGoal}>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedGoal(null)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )}

    {addModalVisible && (
      <Modal visible transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Goal</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Goal Name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={newCurrent}
              onChangeText={setNewCurrent}
              placeholder="Current Amount"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={newTarget}
              onChangeText={setNewTarget}
              placeholder="Target Amount"
              placeholderTextColor="#aaa"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={addGoal}>
                <Text style={styles.actionText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )}
    </View>
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
  goalItem: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalCompleted: {
    backgroundColor: '#304830',
    borderColor: '#66BB6A',
    borderWidth: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 10,
  },
  deleteSwipeAction: {
    backgroundColor: '#FF5555',
    borderRadius: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    padding: 24,
    borderRadius: 20,
    width: '85%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333333',
    color: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#888',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});