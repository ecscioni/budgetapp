import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const BudgetScreen = () => {
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [recurrency, setRecurrency] = useState('Monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRecurrencyPicker, setShowRecurrencyPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

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
      <Text style={styles.title}>Create Your Budget</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Budget Name"
          value={budgetName}
          onChangeText={setBudgetName}
          placeholderTextColor="white"
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="white"
        />

        
        <TouchableOpacity
          style={styles.pickerButtonRow}
          onPress={() => setShowCategoryPicker(true)}
        >
          <Text style={styles.pickerText}>{category}</Text>
          <Text style={styles.chevronIcon}>▼</Text>
        </TouchableOpacity>

        {showCategoryPicker && (
          <View style={styles.pickerModal}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => {
                setCategory(value);
                setShowCategoryPicker(false);
              }}
              dropdownIconColor="white"
            >
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Rent" value="Rent" />
              <Picker.Item label="Transportation" value="Transportation" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        )}

        <Text style={styles.label}>Recurrency:</Text>
        <TouchableOpacity
          style={styles.pickerButtonRow}
          onPress={() => setShowRecurrencyPicker(true)}
        >
          <Text style={styles.pickerText}>{recurrency}</Text>
          <Text style={styles.chevronIcon}>▼</Text>
        </TouchableOpacity>

        {showRecurrencyPicker && (
          <View style={styles.pickerModal}>
            <Picker
              selectedValue={recurrency}
              onValueChange={(value) => {
                setRecurrency(value);
                setShowRecurrencyPicker(false);
              }}
              dropdownIconColor="white"
            >
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
          </View>
        )}

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            Start Date: {startDate.toDateString()}
          </Text>
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
      </View>

      <TouchableOpacity style={styles.customButton} onPress={handleCreateBudget}>
        <Text style={styles.buttonText}>Create Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 90,
    textAlign: 'center',
  },
  inputBox: {
    borderRadius: 10,
    borderColor: '#48BF73',
    padding: 10,
    width: '90%',
    backgroundColor: '#333333',
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 1,
    fontWeight: 'bold',
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 15,
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#333333',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#333333',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  pickerButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
  },
  pickerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chevronIcon: {
    color: 'white',
    fontSize: 16,
  },
  pickerModal: {
    backgroundColor: '#333333',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    paddingVertical: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  customButton: {
    backgroundColor: '#48BF73',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
