// Statistics screen showing spending data using a simple bar chart
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { transactions } from '../../data/transactions';

export default function StatisticsScreen({ navigation }: any) {
  const categories = useMemo(() => {
    const baseColors = ['#10B981', '#60A5FA', '#F59E0B', '#EF4444'];
    const totals: Record<string, number> = {};
    transactions.forEach(t => {
      const amount = parseFloat(t.amount.replace('€', '').replace(',', '.'));
      totals[t.category] = (totals[t.category] || 0) + Math.abs(amount);
    });
    const grand = Object.values(totals).reduce((sum, v) => sum + v, 0);
    return Object.entries(totals).map(([label, val], idx) => ({
      label,
      value: grand ? Math.round((val / grand) * 100) : 0,
      color: baseColors[idx % baseColors.length],
    }));
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = categories[selectedIndex];

  const chartData = {
    labels: categories.map((cat) => cat.label),
    datasets: [
      {
        data: categories.map((cat) => cat.value),
      },
    ],
  };

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
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 90}
          height={220}
          fromZero
          showValuesOnTopOfBars
          chartConfig={{
            backgroundGradientFrom: '#232323',
            backgroundGradientTo: '#232323',
            color: () => '#4ADE80',
          }}
          style={styles.chart}
        />
        <TouchableOpacity style={styles.navButtonRight}>
          <Ionicons name="chevron-forward" size={28} color="#3ee06c" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.chartInfo}
        onPress={() =>
          navigation.navigate('CategoryTransactions', { category: selected.label })
        }
      >
        <Text style={styles.chartLabel}>{selected.label}</Text>
        <Text style={styles.chartValue}>
          {selected.value > 0 ? `+${selected.value}%` : `${selected.value}%`}
        </Text>
      </TouchableOpacity>

      <View style={styles.categoriesContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.label}
            style={styles.categoryBlock}
            onPress={() => setSelectedIndex(index)}
          >
            <LinearGradient
              colors={["#4ADE80", "#2C9C55"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.gradientBlock,
                index === selectedIndex && styles.activeGradientBlock,
              ]}
            >
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              {index === selectedIndex && (
                <Text style={styles.categoryValue}>
                  {cat.value > 0 ? `+${cat.value}%` : `${cat.value}%`}
                </Text>
              )}
            </LinearGradient>
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
    marginVertical: 20,
    alignSelf: 'center',
  },
  chart: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryBlock: {
    width: '48%',
    marginBottom: 12,
  },
  gradientBlock: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeGradientBlock: {
    borderWidth: 2,
    borderColor: '#FFFFFF55',
  },
  categoryLabel: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  categoryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
    navButtonLeft: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  navButtonRight: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
});
