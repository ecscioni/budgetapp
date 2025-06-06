import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatisticsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" style={{ marginLeft: -5 }} />
        <Text style={styles.headerTitle}>STATISTIC</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" style={{ marginRight: -5 }} />
        </View>
      </View>

      {/* Gráfico e navegação */}
      <View style={styles.chartContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#3ee06c" />
        </TouchableOpacity>
        <View style={styles.chartCircle}>
          <Text style={styles.chartLabel}>May 2021</Text>
          <Text style={styles.chartValue}>-38%</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={28} color="#3ee06c" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesRow}>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Food expenses</Text>
          <Text style={styles.categoryValue}>20%</Text>
        </View>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Transportation</Text>
          <Text style={styles.categoryValue}>-6%</Text>
        </View>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Light bill</Text>
          <Text style={styles.categoryValue}>-4%</Text>
        </View>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Fun expenses</Text>
          <Text style={styles.categoryValue}>-8%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20,
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
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  chartCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
    marginHorizontal: 16,
  },
  chartLabel: {
    color: '#fff',
    fontSize: 18,
  },
  chartValue: {
    color: '#3ee06c',
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  categoryCard: {
    backgroundColor: '#292929',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 80,
  },
  categoryTitle: {
    color: '#3ee06c',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});