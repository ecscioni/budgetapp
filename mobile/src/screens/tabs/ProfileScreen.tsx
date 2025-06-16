import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

export const ProfileScreen = () => {
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleThemeOptions = () => {
    const toValue = showThemeOptions ? 0 : 1;
    setShowThemeOptions(!showThemeOptions);
    
    Animated.spring(animatedHeight, {
      toValue,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.itemBox} onPress={() => console.log('Settings pressed')}>
        <Text style={styles.option}>Settings</Text>
      </TouchableOpacity>

      <View style={styles.themeContainer}>
        <TouchableOpacity 
          style={[styles.itemBox, { marginBottom: 0, width: '100%' }]} 
          onPress={toggleThemeOptions}
        >
          <Text style={styles.option}>Themes</Text>
        </TouchableOpacity>

        <Animated.View style={[
          styles.themeOptionsContainer,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 200]
            }),
            opacity: animatedHeight,
            transform: [{
              translateY: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }]
          }
        ]}>
          <TouchableOpacity style={styles.themeOption}>
            <Text style={styles.themeOptionText}>Light Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeOption}>
            <Text style={styles.themeOptionText}>Dark Theme</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

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
    backgroundColor: '#48BF73',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    width: '80%',
    alignItems: 'flex-start',
  },
  themeContainer: {
    width: '80%',
    marginBottom: 10,
  },
  themeOptionsContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 0,
    marginTop: 0,
    overflow: 'hidden',
    width: '100%',
  },
  themeOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    width: '100%',
  },
  themeOptionText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
