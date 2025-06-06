import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define your RootStackParamList type based on your navigator setup
type RootStackParamList = {
  Home: undefined; 
  Login: undefined; 
  Register: undefined; 
  MainApp: undefined;
};

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#aaaaaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainApp')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1f1f1f', 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#66BB6A', 
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#2a2a2a', 
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#66BB6A', 
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1f1f1f', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'gray',
    fontSize: 14,
  },
}); 