import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const BudgetScreen = () => {
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [recurrency, setRecurrency] = useState('Monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateBudget = () => {
    const budgetData = {
      budgetName,
      amount,
      category,
      recurrency,
      startDate,
    };
    console.log('Budget Created:', budgetData);
  
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity></TouchableOpacity>
      <Text style={styles.title}>Create Your Budget</Text>

      <TextInput
        style={styles.input}
        placeholder="Budget Name"
        value={budgetName}
        onChangeText={setBudgetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker selectedValue={category} onValueChange={(value) => setCategory(value)}>
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Rent" value="Rent" />
        <Picker.Item label="Transportation" value="Transportation" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Recurrency:</Text>
      <Picker selectedValue={recurrency} onValueChange={(value) => setRecurrency(value)}>
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Weekly" value="Weekly" />
        <Picker.Item label="Monthly" value="Monthly" />
        <Picker.Item label="Yearly" value="Yearly" />
      </Picker>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setShowDatePicker(false);
            setStartDate(currentDate);
          }}
        />
      )}
      <View style={styles.box}>
        <Button  title="Create Budget" onPress={handleCreateBudget} />

      </View>
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#222222',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color:'green'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    color:'white'
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: 'white'
  },
  dateText: {
    paddingVertical: 10,
    fontSize: 16,
    color: 'white',
  },
  box: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: '80%',
    alignItems: 'flex-start',
    color: 'green',
    
  }
});
