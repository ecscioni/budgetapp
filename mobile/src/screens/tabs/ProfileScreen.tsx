import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useCards } from '../../contexts/CardsContext';

export const ProfileScreen = () => {
  const { cards } = useCards();
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [showNotificationsOptions, setShowNotificationsOptions] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedSettingsHeight = useRef(new Animated.Value(0)).current;
  const animatedNotificationsHeight = useRef(new Animated.Value(0)).current;

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

  const toggleSettingsOptions = () => {
    const toValue = showSettingsOptions ? 0 : 1;
    setShowSettingsOptions(!showSettingsOptions);
    
    Animated.spring(animatedSettingsHeight, {
      toValue,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  };

  const toggleNotificationsOptions = () => {
    const toValue = showNotificationsOptions ? 0 : 1;
    setShowNotificationsOptions(!showNotificationsOptions);
    
    Animated.spring(animatedNotificationsHeight, {
      toValue,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  };

  // Filter only real cards (exclude the "add" card)
  const realCards = cards.filter(card => !card.isAddCard);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.settingsContainer}>
        <TouchableOpacity 
          style={[styles.itemBox, { marginBottom: 0, width: '100%' }]} 
          onPress={toggleSettingsOptions}
        >
          <Text style={styles.option}>Settings</Text>
        </TouchableOpacity>

        <Animated.View style={[
          styles.settingsOptionsContainer,
          {
            maxHeight: animatedSettingsHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, realCards.length * 60 + 20]
            }),
            opacity: animatedSettingsHeight,
            transform: [{
              translateY: animatedSettingsHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }]
          }
        ]}>
          {realCards.map(card => (
            <TouchableOpacity key={card.id} style={styles.cardOption}>
              <Text style={styles.cardOptionText}>
                {card.holderName || 'Card'} •••• {card.last4 || '****'}
              </Text>
            </TouchableOpacity>
          ))}
          {realCards.length === 0 && (
            <TouchableOpacity style={styles.cardOption}>
              <Text style={styles.cardOptionText}>No cards available</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>

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

      <View style={styles.notificationsContainer}>
        <TouchableOpacity 
          style={[styles.itemBox, { marginBottom: 0, width: '100%' }]} 
          onPress={toggleNotificationsOptions}
        >
          <Text style={styles.option}>Notifications & offers</Text>
        </TouchableOpacity>

        <Animated.View style={[
          styles.notificationsOptionsContainer,
          {
            maxHeight: animatedNotificationsHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 240]
            }),
            opacity: animatedNotificationsHeight,
            transform: [{
              translateY: animatedNotificationsHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })
            }]
          }
        ]}>
          <TouchableOpacity style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>Push Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>Email Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>Special Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>Promotional Messages</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

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
  settingsContainer: {
    width: '80%',
    marginBottom: 10,
  },
  settingsOptionsContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 0,
    marginTop: 0,
    overflow: 'hidden',
    width: '100%',
  },
  cardOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    width: '100%',
  },
  cardOptionText: {
    color: '#ffffff',
    fontSize: 16,
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
  notificationsContainer: {
    width: '80%',
    marginBottom: 10,
  },
  notificationsOptionsContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 0,
    marginTop: 0,
    overflow: 'hidden',
    width: '100%',
  },
  notificationOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    width: '100%',
  },
  notificationOptionText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
