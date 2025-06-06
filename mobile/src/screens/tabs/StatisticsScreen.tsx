// NOTA: Necessário instalar 'react-native-svg-charts' e 'react-native-svg' para este gráfico funcionar
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

      {/* Gráfico e navegação (estrutura básica restaurada) */}
      <View style={styles.chartContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#3ee06c" />
        </TouchableOpacity>
        <View style={styles.chartCirclePlaceholder}>
          <Text style={styles.chartLabelPlaceholder}>May 2021</Text>
          <Text style={styles.chartValuePlaceholder}>-38%</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={28} color="#3ee06c" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesRow}>
        <View style={[styles.categoryCard, { backgroundColor: '#3ee06c' }]}> 
          <Text style={styles.categoryTitle}>Food expenses</Text>
          <Text style={styles.categoryValue}>20%</Text>
        </View>
        <View style={[styles.categoryCard, { backgroundColor: '#66BB6A' }]}> 
          <Text style={styles.categoryTitle}>Transportation</Text>
          <Text style={styles.categoryValue}>-6%</Text>
        </View>
        <View style={[styles.categoryCard, { backgroundColor: '#4ADE80' }]}> 
          <Text style={styles.categoryTitle}>Light bill</Text>
          <Text style={styles.categoryValue}>-4%</Text>
        </View>
        <View style={[styles.categoryCard, { backgroundColor: '#2563EB' }]}> 
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
  chartCirclePlaceholder: {
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
  chartLabelPlaceholder: {
    color: '#fff',
    fontSize: 18,
  },
  chartValuePlaceholder: {
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
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 80,
  },
  categoryTitle: {
    color: '#fff',
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