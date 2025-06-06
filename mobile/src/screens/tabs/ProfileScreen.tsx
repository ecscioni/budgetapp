import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.itemBox} onPress={() => console.log('Settings pressed')}>
        <Text style={styles.option}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBox} onPress={() => console.log('Themes pressed')}>
        <Text style={styles.option}>Themes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemBox} onPress={() => console.log('Notifications pressed')}>
        <Text style={styles.option}>Notifications & offers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logOutBox}>
        <Text style={styles.option}>Logout</Text>
      </TouchableOpacity>
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
  itemBox: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: '80%',
    alignItems: 'flex-start',
  },
  option: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
  },
  logOutBox: {
     backgroundColor: 'green',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: '80%',
    alignItems: 'flex-start',
  },
    
  
  
});
