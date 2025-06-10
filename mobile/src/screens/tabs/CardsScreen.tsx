import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CardItem from './CardItem';
import { Ionicons } from '@expo/vector-icons';

interface Card {
  id: string;
  cardNumber?: string;
  holderName?: string;
  balance?: string;
  currency?: string;
  last4?: string;
  expiry?: string;
  cvc?: string;
  imageUrl?: string;
  isAddCard?: boolean;
}

const initialCards: Card[] = [
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

const CARD_WIDTH = Dimensions.get('window').width - 30;
const SNAP_INTERVAL = CARD_WIDTH;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const CardsScreen = () => {
  const [cards, setCards] = useState(initialCards);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList<Card>>(null);

  const [newCardNumber, setNewCardNumber] = useState('');
  const [newHolderName, setNewHolderName] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newCvc, setNewCvc] = useState('');

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_INTERVAL);
    setSelectedIndex(newIndex);
  };

  const handleAddCard = () => {
    const cleanedCardNumber = newCardNumber.replace(/\s/g, ''); // Remove todos os espaços

    if (!cleanedCardNumber || cleanedCardNumber.length !== 16 || !newHolderName || !newExpiry || !newCvc) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos do cartão. O número do cartão deve ter 16 dígitos.');
      return;
    }

    const newId = (cards.length + 1).toString(); // Simple ID generation
    const newCard = {
      id: newId,
      cardNumber: newCardNumber, // Manter o número formatado para exibição
      holderName: newHolderName,
      balance: '●●●●●●●●', // Default value
      currency: 'EUR', // Default value
      last4: cleanedCardNumber.slice(-4), // Usar o número limpo para os últimos 4 dígitos
      expiry: newExpiry,
      cvc: newCvc,
      imageUrl: 'https://imgur.com/3u4JHkm.png', // Default image
    };

    setCards(prevCards => [...prevCards.slice(0, -1), newCard, prevCards[prevCards.length - 1]]);
    setNewCardNumber('');
    setNewHolderName('');
    setNewExpiry('');
    setNewCvc('');
    Alert.alert('Sucesso', 'NEW Card added!');
    // Optionally scroll to the new card
    if (flatListRef.current) {
      const listRef = flatListRef.current;
      setTimeout(() => {
        listRef.scrollToIndex({ index: cards.length - 1, animated: true });
      }, 100);
    }
  };

  const handleCardNumberChange = (text: string) => {
    // Remove todos os caracteres não numéricos
    let cleanedText = text.replace(/\D/g, '');
    // Limita a 16 dígitos
    cleanedText = cleanedText.substring(0, 16);
    // Adiciona espaços a cada 4 dígitos
    let formattedText = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedText += ' ';
      }
      formattedText += cleanedText[i];
    }
    setNewCardNumber(formattedText);
  };

  const handleExpiryChange = (text: string) => {
    // Remove todos os caracteres não numéricos
    let cleanedText = text.replace(/\D/g, '');
    // Limita a 4 dígitos para MMYY
    cleanedText = cleanedText.substring(0, 4);

    if (cleanedText.length > 2) {
      cleanedText = `${cleanedText.substring(0, 2)}/${cleanedText.substring(2, 4)}`;
    }
    setNewExpiry(cleanedText);
  };

  const card = cards[selectedIndex];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <CardItem
                cardNumber={item.cardNumber}
                holderName={item.holderName}
                expiry={item.expiry}
                cvc={item.cvc}
                isAddCard={item.isAddCard}
                imageUrl={item.imageUrl}
                style={{ width: CARD_WIDTH }}
              />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={true}
            decelerationRate="fast"
            style={{ flexGrow: 0, width: SCREEN_WIDTH }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
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
                <TextInput
                  style={styles.infoValueInput}
                  placeholder="**** **** **** ****"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={newCardNumber}
                  onChangeText={handleCardNumberChange}
                  maxLength={19} // 16 dígitos + 3 espaços
                />
              </View>
              <View style={styles.infoField}>
                <Text style={styles.infoLabelElegant}>Name</Text>
                <TextInput
                  style={styles.infoValueInput}
                  placeholder="CARD HOLDERNAME"
                  placeholderTextColor="#888"
                  value={newHolderName}
                  onChangeText={setNewHolderName}
                />
              </View>
              <View style={[styles.infoField, { flexDirection: 'row', justifyContent: 'space-between', gap: 24 }]}> 
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabelElegant}>Validity</Text>
                  <TextInput
                    style={styles.infoValueInput}
                    placeholder="MM/AA"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={newExpiry}
                    onChangeText={handleExpiryChange}
                    maxLength={5} // MM/AA
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabelElegant}>CVC</Text>
                  <TextInput
                    style={styles.infoValueInput}
                    placeholder="***"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={newCvc}
                    onChangeText={setNewCvc}
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
                <Text style={styles.addButtonText}>Add Card</Text>
              </TouchableOpacity>
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
    </TouchableWithoutFeedback>
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
    marginHorizontal: 10,
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
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#48BF73',
    shadowColor: '#48BF73',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 30,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  infoTitleElegant: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    letterSpacing: 2,
    alignSelf: 'center',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  infoField: {
    marginBottom: 15,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  infoLabelElegant: {
    color: '#48BF73',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 0,
    letterSpacing: 0.5,
  },
  infoValueElegant: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  infoValueInput: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.2,
    width: '100%',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#48BF73',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    shadowColor: '#48BF73',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 