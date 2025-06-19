import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import CardItem from './CardItem';
import { Ionicons } from '@expo/vector-icons';
import { useCards } from '../../contexts/CardsContext';

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

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - 30;
const SNAP_INTERVAL = SCREEN_WIDTH;

export const CardsScreen = () => {
  const { cards, addCard, removeCard, updateCard } = useCards();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList<Card>>(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedCardForManagement, setSelectedCardForManagement] = useState<Card | null>(null);

  const [newCardNumber, setNewCardNumber] = useState('');
  const [newHolderName, setNewHolderName] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newCvc, setNewCvc] = useState('');

  const [showAddCardSheet, setShowAddCardSheet] = useState(false);

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SNAP_INTERVAL);
    setSelectedIndex(newIndex);
  };

  const handleAddCard = () => {
    const cleanedCardNumber = newCardNumber.replace(/\s/g, ''); // Remove all spaces

    if (!cleanedCardNumber || cleanedCardNumber.length !== 16 || !newHolderName || !newExpiry || !newCvc) {
      Alert.alert('Error', 'Please fill in all card fields. The card number must have 16 digits.');
      return;
    }

    const newCardData = {
      cardNumber: newCardNumber, // Keep formatted number for display
      holderName: newHolderName,
      balance: '●●●●●●●●', // Default value
      currency: 'EUR', // Default value
      last4: cleanedCardNumber.slice(-4), // Use clean number for last 4 digits
      expiry: newExpiry,
      cvc: newCvc,
      isAddCard: false,
    };

    addCard(newCardData);
    setNewCardNumber('');
    setNewHolderName('');
    setNewExpiry('');
    setNewCvc('');
    Alert.alert('Success', 'NEW Card added!');
    // Optionally scroll to the new card
    if (flatListRef.current) {
      const listRef = flatListRef.current;
      setTimeout(() => {
        listRef.scrollToIndex({ index: cards.length - 1, animated: true });
      }, 100);
    }
  };

  const handleCardNumberChange = (text: string) => {
    // Remove all non-numeric characters
    let cleanedText = text.replace(/\D/g, '');
    // Limit to 16 digits
    cleanedText = cleanedText.substring(0, 16);
    // Add spaces every 4 digits
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
    // Remove all non-numeric characters
    let cleanedText = text.replace(/\D/g, '');
    // Limit to 4 digits for MMYY
    cleanedText = cleanedText.substring(0, 4);

    if (cleanedText.length > 2) {
      cleanedText = `${cleanedText.substring(0, 2)}/${cleanedText.substring(2, 4)}`;
    }
    setNewExpiry(cleanedText);
  };

  const openManageModal = () => {
    const currentCard = cards[selectedIndex];
    if (!currentCard.isAddCard) {
      setSelectedCardForManagement(currentCard);
      setShowManageModal(true);
    }
  };

  const handleDeleteCard = () => {
    if (selectedCardForManagement) {
      Alert.alert(
        'Confirm deletion',
        'Are you sure you want to delete this card?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: () => {
              removeCard(selectedCardForManagement.id);
              setShowManageModal(false);
              setSelectedCardForManagement(null);
              Alert.alert('Success', 'Card deleted successfully!');
            }
          }
        ]
      );
    }
  };

  const card = cards[selectedIndex];
  const realCards = cards.filter(card => !card.isAddCard);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="person-outline" size={24} color="#FFFFFF" style={{ marginLeft: -5 }} />
          <Text style={styles.headerTitle}>MY CARDS</Text>
          <View style={styles.headerIcons}>
            {!card.isAddCard && (
              <TouchableOpacity onPress={openManageModal} style={styles.manageButton}>
                <Ionicons name="settings-outline" size={24} color="#FFFFFF" style={{ marginRight: -5 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {realCards.length === 0 ? (
          <View style={styles.noCardsContainer}>
            <Ionicons name="card-outline" size={80} color="#666" />
            <Text style={styles.noCardsTitle}>No Cards Yet</Text>
            <Text style={styles.noCardsSubtitle}>Add your first card to get started</Text>
            <TouchableOpacity style={styles.addFirstCardButton} onPress={() => setShowAddCardSheet(true)}>
              <Text style={styles.addFirstCardButtonText}>Add Your First Card</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
                      maxLength={19}
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
                        maxLength={5}
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
          </>
        )}

        {/* Card Management Modal */}
        <Modal visible={showManageModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Manage Card</Text>
              
              {selectedCardForManagement && (
                <View style={styles.cardInfoContainer}>
                  <Text style={styles.cardInfoText}>
                    {selectedCardForManagement.holderName || 'Card'} •••• {selectedCardForManagement.last4 || '****'}
                  </Text>
                  <Text style={styles.cardInfoSubtext}>
                    Valid until: {selectedCardForManagement.expiry || '--/--'}
                  </Text>
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalActionButton} onPress={() => setShowManageModal(false)}>
                  <Text style={styles.modalActionText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalActionButton, styles.deleteButton]} onPress={handleDeleteCard}>
                  <Text style={[styles.modalActionText, styles.deleteButtonText]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Bottom Sheet para adicionar cartão */}
        <Modal
          visible={showAddCardSheet}
          animationType="slide"
          transparent
          onRequestClose={() => setShowAddCardSheet(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.bottomSheetOverlay}>
              <View style={styles.bottomSheetContent}>
                <Text style={styles.infoTitleElegant}>ADICIONAR CARTÃO</Text>
                <View style={styles.infoField}>
                  <Text style={styles.infoLabelElegant}>Number</Text>
                  <TextInput
                    style={styles.infoValueInput}
                    placeholder="**** **** **** ****"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={newCardNumber}
                    onChangeText={handleCardNumberChange}
                    maxLength={19}
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
                      maxLength={5}
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
                <TouchableOpacity style={styles.addButton} onPress={() => { handleAddCard(); setShowAddCardSheet(false); }}>
                  <Text style={styles.addButtonText}>Adicionar Cartão</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAddCardSheet(false)} style={{ marginTop: 10 }}>
                  <Text style={{ color: '#48BF73', fontWeight: 'bold' }}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  manageButton: {
    padding: 5,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardInfoSubtext: {
    fontSize: 16,
    color: '#888',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalActionButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#48BF73',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#48BF73',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
  },
  deleteButtonText: {
    color: '#fff',
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noCardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  noCardsSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  addFirstCardButton: {
    backgroundColor: '#48BF73',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#48BF73',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 200,
  },
  addFirstCardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContent: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#48BF73',
    shadowColor: '#48BF73',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
}); 