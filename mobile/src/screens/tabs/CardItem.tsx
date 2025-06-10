import React from 'react';
import { Image, StyleSheet, View, ViewStyle, Text, ImageBackground } from 'react-native';

interface CardItemProps {
  cardNumber?: string;
  holderName?: string;
  expiry?: string;
  cvc?: string;
  isAddCard?: boolean;
  style?: ViewStyle;
  imageUrl?: string;
}

const CardItem: React.FC<CardItemProps> = ({ cardNumber, holderName, expiry, cvc, isAddCard, style, imageUrl }) => {
  if (isAddCard) {
    return (
      <View style={[styles.cardContainer, style]}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="contain" />
      </View>
    );
  }

  return (
    <View style={[styles.cardContainer, style]}>
      <ImageBackground
        source={require('../../../assets/files/bankcardempty.png')}
        style={styles.cardImageBackground}
        resizeMode="contain"
      >
        <Text style={styles.holderName}>{holderName || 'CARD HOLDERNAME'}</Text>
        <Text style={styles.cardNumber}>{cardNumber || '**** **** **** ****'}</Text>
        <View style={styles.bottomRow}>
          {/* <Text style={styles.expiry}>{expiry || '--/--'}</Text> */}
          {/* <Text style={styles.cvc}>{cvc || '---'}</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginVertical: 16,
    marginHorizontal: 0,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    marginLeft: 30,
  },
  cardImageBackground: {
    width: '100%',
    height: '111%',
    borderRadius: 15,
    justifyContent: 'flex-end',
    padding: 20,
    marginTop: 15,
    marginLeft: 40,
  },
  cardNumber: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'GemunuLibre-ExtraLight',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  holderName: {
    position: 'absolute',
    bottom: 55,
    left: 30,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'GemunuLibre-ExtraLight',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiry: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GemunuLibre-ExtraLight',
    fontWeight: 'bold',
  },
  cvc: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GemunuLibre-ExtraLight',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'red', // Temporário para depuração
  },
});

export default CardItem; 