import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const image = { uri: 'https://imgur.com/WBhZZn5.png' };

export const InicialScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* Semi-transparent overlay for opacity */}
        <View style={styles.opacityOverlay} />
        {/* Texts over the background image */}
        <View style={styles.overlay}>
          <Text style={styles.title}>FUND</Text>
          <Text style={styles.title1}>FLOW</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>START NOW</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InicialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center' // Center content horizontally
  },
  opacityOverlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.9)' // Black with 50% opacity
  },
  overlay: {
    alignItems: 'center',
    marginBottom: 20 // Adjust spacing
  },
  title: {
    fontWeight: 'bold',
    fontSize: 72,
    color: '#FFFFFF' // White text for visibility
  },
  title1: {
    fontWeight: 'bold',
    color: '#3B82F6', // Blue color
    marginTop: -25,
    marginBottom: 25,
    fontSize: 70
  },
  card: {
    backgroundColor: 'rgba(22, 109, 250, 0.9)',
    padding: 20,
    paddingLeft: 65,
    paddingRight: 65,
    borderRadius: 5,
  },
  cardText: {
    color: '#FFFFFF', // White text for visibility
    textAlign: 'center'
  }
});