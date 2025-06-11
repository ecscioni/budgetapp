import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

export const GoalScreen = () => {
  const [goalName, setGoalName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Plane ticket');
  const [recurrency, setRecurrency] = useState('Monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreateGoal = () => {
    const goalData = {
      goalName,
      amount,
      category,
      recurrency,
      startDate,
      endDate,
    };
    console.log('Goal Created:', goalData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Goals</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.text}
          placeholder='Goal name'
          value={goalName}
          onChangeText={setGoalName}
        />
        <TextInput
          style={styles.text}
          placeholder='Amount'
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />

        <Text style={styles.text}>Category:</Text>
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Vacation" value="Vacation" />
          <Picker.Item label="To buy a car" value="Car" />
          <Picker.Item label="Emergency" value="Emergency" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Pay off debt" value="Debt" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Text style={styles.text}>Recurrency:</Text>
        <Picker selectedValue={recurrency} onValueChange={setRecurrency}>
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Yearly" value="Yearly" />
        </Picker>

        {/* Start Date */}
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <Text style={styles.text}>Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        {/* End Date */}
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <Text style={styles.text}>End Date: {endDate.toDateString()}</Text>
        </TouchableOpacity>

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}
         
        <Button title="Create Goal" onPress={handleCreateGoal} />
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
    color: '#48BF73',
    marginBottom: 20,
  },
  inputBox: {
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    width: '90%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 6,
  },
});
