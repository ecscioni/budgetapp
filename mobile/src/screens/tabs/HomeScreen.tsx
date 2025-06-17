import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, FlatList, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { goals as initialGoals, Goal } from '../../data/goals';
import { useCards } from '../../contexts/CardsContext';
import CardItem from './CardItem';
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - 30;
const SNAP_INTERVAL = SCREEN_WIDTH;

// Main HomeScreen component
const HomeScreen = ({ navigation }: { navigation: HomeScreenProps }) => {
  const { cards } = useCards();
  const [goalList, setGoalList] = useState<Goal[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempCurrent, setTempCurrent] = useState('');
  const [tempTarget, setTempTarget] = useState('');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Modal state for adding new goals
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newTarget, setNewTarget] = useState('');

  // Filter only real cards (exclude the "add" card)
  const realCards = cards.filter(card => !card.isAddCard);

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_INTERVAL);
    setSelectedCardIndex(newIndex);
  };

  const openModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setTempName(goal.name);
    setTempCurrent(goal.current.toString());
    setTempTarget(goal.target.toString());
  };

  const saveGoal = () => {
    if (!selectedGoal) return;
    setGoalList(prev =>
      prev.map(g =>
        g.id === selectedGoal.id
          ? {
              ...g,
              name: tempName,
              current: parseFloat(tempCurrent) || 0,
              target: parseFloat(tempTarget) || 0,
            }
          : g
      )
    );
    setSelectedGoal(null);
  };

  const addGoal = () => {
    setGoalList(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName || `Goal ${prev.length + 1}`,
        current: parseFloat(newCurrent) || 0,
        target: parseFloat(newTarget) || 0,
      },
    ]);
    setAddModalVisible(false);
    setNewName('');
    setNewCurrent('0');
    setNewTarget('');
  };

  const deleteGoal = (id: string) => {
    setGoalList(prev => prev.filter(g => g.id !== id));
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

      {/* Credit Cards Section */}
      <View style={styles.cardSection}>
        {realCards.length > 0 ? (
          <View style={styles.cardCarouselContainer}>
            <FlatList
              ref={flatListRef}
              data={realCards}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('Cards')}
                >
                  <CardItem
                    cardNumber={item.cardNumber}
                    holderName={item.holderName}
                    expiry={item.expiry}
                    cvc={item.cvc}
                    isAddCard={false}
                    imageUrl={item.imageUrl}
                    style={styles.homeCardStyle}
                  />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled={true}
              decelerationRate="fast"
              style={{ flexGrow: 0, width: SCREEN_WIDTH }}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              getItemLayout={(_, index) => ({ length: SNAP_INTERVAL, offset: SNAP_INTERVAL * index, index })}
              initialScrollIndex={0}
            />
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.noCardsContainer}
            onPress={() => navigation.navigate('Cards')}
          >
            <Ionicons name="card-outline" size={48} color="#666" />
            <Text style={styles.noCardsText}>No cards added yet</Text>
            <Text style={styles.noCardsSubtext}>Tap to add your first card</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 10,
    marginTop: 25,
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
    marginBottom: 0,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardCarouselContainer: {
    height: 220,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardItem: {
    width: CARD_WIDTH,
    height: 330,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  homeCardStyle: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 15,
    marginRight: 19,
  },
  noCardsContainer: {
    backgroundColor: '#2a2a2a',
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  noCardsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  noCardsSubtext: {
    color: '#888',
    fontSize: 12,
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