// NOTA: Necessário instalar 'react-native-svg-charts' e 'react-native-svg' para este gráfico funcionar
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function StatisticsScreen() {
  const categories = [
    { label: 'Food expenses', value: 20, color: '#3ee06c' },
    { label: 'Transportation', value: 6, color: '#66BB6A' },
    { label: 'Light bill', value: 4, color: '#4ADE80' },
    { label: 'Fun expenses', value: 8, color: '#2563EB' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = categories[selectedIndex];

  const chartData = categories.map(cat => ({
    name: cat.label,
    population: cat.value,
    color: cat.color,
    legendFontColor: '#fff',
    legendFontSize: 12,
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

      {/* Gráfico e navegação (estrutura básica restaurada) */}
      <View style={styles.chartContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#3ee06c" />
        </TouchableOpacity>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 160}
          height={180}
          chartConfig={{ color: () => '#fff' }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[0, 0]}
          hasLegend={false}
          style={styles.chart}
        />
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={28} color="#3ee06c" />
        </TouchableOpacity>
      </View>
      <View style={styles.chartInfo}>
        <Text style={styles.chartLabel}>{selected.label}</Text>
        <Text style={styles.chartValue}>
          {selected.value > 0 ? `+${selected.value}%` : `${selected.value}%`}
        </Text>
      </View>

      <View style={styles.legend}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.label}
            style={[
              styles.legendItem,
              index === selectedIndex && styles.activeLegendItem,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <View style={[styles.legendColor, { backgroundColor: cat.color }]} />
            <Text style={styles.legendLabel}>{cat.label}</Text>
            <Text style={styles.legendValue}>
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
  chart: {
    marginHorizontal: 16,
  },
  chartInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chartLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
  },
  chartValue: {
    color: '#3ee06c',
    fontSize: 32,
    fontWeight: 'bold',
  },
  legend: {
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  activeLegendItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    color: '#fff',
    flex: 1,
    fontSize: 14,
  },
  legendValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});