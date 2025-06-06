import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Transaction } from '../data/transactions';

type Props = {
  transactions: Transaction[];
};

const SummaryCard: React.FC<Props> = ({ transactions }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const income = transactions
    .filter((t: Transaction) => t.type === 'received')
    .reduce((sum, t: Transaction) => sum + parseFloat(t.amount.replace('€', '').replace(',', '.')), 0);

  const spent = transactions
    .filter((t: Transaction) => t.type === 'sent')
    .reduce((sum, t: Transaction) => sum + Math.abs(parseFloat(t.amount.replace('€', '').replace(',', '.'))), 0);

  const balance = income - spent;

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <Text style={styles.title}>Financial Summary</Text>
          <Text style={styles.subtitle}>Tap to view</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Overview</Text>

            <View style={styles.detailRow}><Text style={styles.label}>Income</Text><Text style={[styles.value, styles.income]}>€{income.toFixed(2)}</Text></View>
            <View style={styles.detailRow}><Text style={styles.label}>Spent</Text><Text style={[styles.value, styles.spent]}>€{spent.toFixed(2)}</Text></View>
            <View style={styles.detailRow}><Text style={styles.label}>Balance</Text><Text style={styles.value}>€{balance.toFixed(2)}</Text></View>

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
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 16,
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
    marginBottom: 10,
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
    backgroundColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default SummaryCard;
