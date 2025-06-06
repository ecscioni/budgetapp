import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

interface CardItemProps {
  imageUrl?: string;
  style?: ViewStyle;
}

const CardItem: React.FC<CardItemProps> = ({ imageUrl, style }) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="contain" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    marginVertical: 16,
    marginHorizontal: 0,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
});

export default CardItem; 