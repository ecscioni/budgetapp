import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';

export const GoalScreen = () => {
  const [goalName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Plane ticket');
  const [recurrency, setRecurrency] = useState('Monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const[endDate, setEndDate] =useState(new Date())

  const handleCreateGoal = () => {
    const goalData = {
      goalName,
      amount,
      category,
      recurrency,
      startDate,
    };
    console.log('Goal Created:', goalData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Goals</Text>
      <View style={styles.input}>
        <TextInput style={styles.text} >
        </TextInput>
      
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
  input:{
    borderRadius: 10,
    borderColor: "white",
  },
  text:{
    fontSize:22,
    fontWeight:'bold',
    color:'white',

  }


  
});
