// NOTA: Necessário instalar 'react-native-svg-charts' e 'react-native-svg' para este gráfico funcionar
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

export default function StatisticsScreen() {
  const categories = [
    { label: 'Food expenses', value: 20, color: '#3ee06c' },
    { label: 'Transportation', value: -6, color: '#66BB6A' },
    { label: 'Light bill', value: -4, color: '#4ADE80' },
    { label: 'Fun expenses', value: -8, color: '#2563EB' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = categories[selectedIndex];

  const pieData = categories.map((cat, index) => ({
    key: cat.label,
    value: Math.abs(cat.value),
    svg: {
      fill: cat.color,
      onPress: () => setSelectedIndex(index),
    },
    arc: {
      outerRadius: index === selectedIndex ? '105%' : '100%',
      padAngle: 0.02,
    },
  }));

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

      {/* Chart with navigation */}
      <View style={styles.chartContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#3ee06c" />
        </TouchableOpacity>
        <View style={styles.chartWrapper}>
          <PieChart style={styles.chart} data={pieData} innerRadius={70} />
          <View style={styles.chartCenter} pointerEvents="none">
            <Text style={styles.chartLabel}>{selected.label}</Text>
            <Text style={styles.chartValue}>
              {selected.value > 0 ? `+${selected.value}%` : `${selected.value}%`}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={28} color="#3ee06c" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesRow}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.label}
            style={[
              styles.categoryCard,
              { backgroundColor: cat.color },
              index === selectedIndex && styles.activeCategory,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <Text style={styles.categoryTitle}>{cat.label}</Text>
            <Text style={styles.categoryValue}>
              {cat.value > 0 ? `+${cat.value}%` : `${cat.value}%`}
            </Text>
          </TouchableOpacity>
        ))}
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
  chartWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: '#191919',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
    marginHorizontal: 16,
  },
  chart: {
    height: 180,
    width: 180,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLabel: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
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
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: 80,
  },
  activeCategory: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
