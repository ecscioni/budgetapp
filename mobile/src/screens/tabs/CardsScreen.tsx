import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import CardItem from './CardItem';
import { Ionicons } from '@expo/vector-icons';

const cards = [
  {
    id: '1',
    cardNumber: '1234 1234 1234 1234',
    holderName: 'Jonh Doe',
    balance: '●●●●●●●●',
    currency: 'AMD',
    last4: '3567',
    expiry: '02/25',
    cvc: '123',
    imageUrl: 'https://imgur.com/3u4JHkm.png',
  },
  // Add more cards if we want
  {
    id: 'add',
    imageUrl: 'https://imgur.com/g68oGmZ.png',
    isAddCard: true,
  },
];

const CARD_WIDTH = 320;
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const CardsScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_INTERVAL);
    setSelectedIndex(newIndex);
  };

  const card = cards[selectedIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" style={{ marginLeft: -5 }} />
        <Text style={styles.headerTitle}>MY CARDS</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={{ marginRight: -5 }} />
        </View>
      </View>
      <View style={styles.cardCarouselContainer}>
        <FlatList
          ref={flatListRef}
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardItem imageUrl={item.imageUrl} style={{ width: CARD_WIDTH, marginRight: 16 }} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={true}
          decelerationRate="fast"
          style={{ flexGrow: 0, width: SCREEN_WIDTH }}
          contentContainerStyle={{ paddingLeft: 27, paddingRight: 32 }}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({ length: SNAP_INTERVAL, offset: SNAP_INTERVAL * index, index })}
          initialScrollIndex={0}
        />
      </View>
      {card.isAddCard ? (
        <View style={styles.infoSection}>
          <View style={styles.infoCardElegant}>
            <Text style={styles.infoTitleElegant}>CARD INFORMATIONS</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoLabelElegant}>Number</Text>
              <Text style={styles.infoValueElegant}>{''}</Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.infoLabelElegant}>Name</Text>
              <Text style={styles.infoValueElegant}>{''}</Text>
            </View>
            <View style={[styles.infoField, { flexDirection: 'row', justifyContent: 'space-between', gap: 24 }]}> 
              <View>
                <Text style={styles.infoLabelElegant}>Validity</Text>
                <Text style={styles.infoValueElegant}>{''}</Text>
              </View>
              <View>
                <Text style={styles.infoLabelElegant}>CVC</Text>
                <Text style={styles.infoValueElegant}>{''}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.infoSection}>
          <View style={styles.infoCardElegant}>
            <Text style={styles.infoTitleElegant}>CARD INFORMATIONS</Text>
            <View style={styles.infoField}>
              <Text style={styles.infoLabelElegant}>Number</Text>
              <Text style={styles.infoValueElegant}>{card.cardNumber || '**** **** **** ****'}</Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.infoLabelElegant}>Name</Text>
              <Text style={styles.infoValueElegant}>{card.holderName || '-'}</Text>
            </View>
            <View style={[styles.infoField, { flexDirection: 'row', justifyContent: 'space-between', gap: 24 }]}> 
              <View>
                <Text style={styles.infoLabelElegant}>Validity</Text>
                <Text style={styles.infoValueElegant}>{card.expiry || '--/--'}</Text>
              </View>
              <View>
                <Text style={styles.infoLabelElegant}>CVC</Text>
                <Text style={styles.infoValueElegant}>{card.cvc || '---'}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#66BB6A',
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCarouselContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  infoTitle: {
    color: '#48BF73',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: '#222',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  infoCardElegant: {
    backgroundColor: '#2a2a2a',
    borderRadius: 32,
    padding: 28,
    borderWidth: 1.5,
    borderColor: '#48BF73',
    shadowColor: '#48BF73',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 20,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  infoTitleElegant: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 28,
    letterSpacing: 2,
    alignSelf: 'center',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  infoField: {
    marginBottom: 18,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  infoLabelElegant: {
    color: '#48BF73',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  infoValueElegant: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
}); 