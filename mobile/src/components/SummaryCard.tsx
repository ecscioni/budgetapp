import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Transaction } from '../data/transactions';

type Props = {
  transactions: Transaction[];
  /** Optional style overrides for the card container */
  style?: ViewStyle;
  forceZero?: boolean;
};

const SummaryCard: React.FC<Props> = ({ transactions, style, forceZero }) => {
  const [modalVisible, setModalVisible] = useState(false);

  let income = transactions
    .filter((t: Transaction) => t.type === 'received')
    .reduce((sum, t: Transaction) => sum + parseFloat(t.amount.replace('€', '').replace(',', '.')), 0);

  let spent = transactions
    .filter((t: Transaction) => t.type === 'sent')
    .reduce((sum, t: Transaction) => sum + Math.abs(parseFloat(t.amount.replace('€', '').replace(',', '.'))), 0);

  let balance = income - spent;
  let spentPercent = income ? Math.min((spent / income) * 100, 100) : 0;

  if (forceZero) {
    income = 0;
    spent = 0;
    balance = 0;
    spentPercent = 0;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={["#0E0E0E", "#2C9C55", "#4ADE80"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, style]}
        >
          <Text style={styles.title}>Budget Left</Text>
          <Text style={styles.balance}>€{balance.toFixed(2)}</Text>
          <Text style={styles.subtitle}>Tap for details</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Overview</Text>

            <View style={styles.detailRow}>
              <View style={styles.rowLabel}>
                <Ionicons name="arrow-down" size={18} color="#A5D6A7" />
                <Text style={[styles.label, styles.rowText]}>Income</Text>
              </View>
              <Text style={[styles.value, styles.income]}>€{income.toFixed(2)}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.rowLabel}>
                <Ionicons name="arrow-up" size={18} color="#EF9A9A" />
                <Text style={[styles.label, styles.rowText]}>Spent</Text>
              </View>
              <Text style={[styles.value, styles.spent]}>€{spent.toFixed(2)}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.rowLabel}>
                <Ionicons name="wallet" size={18} color="#FFFFFF" />
                <Text style={[styles.label, styles.rowText]}>Balance</Text>
              </View>
              <Text style={styles.value}>€{balance.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    color: '#999999',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    padding: 24,
    borderRadius: 20,
    width: '85%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 6,
  },
  label: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  income: {
    color: '#A5D6A7',
  },
  spent: {
    color: '#EF9A9A',
  },
  closeButton: {
    backgroundColor: '#48BF73',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SummaryCard;
