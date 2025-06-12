// Statistics screen showing spending data using a simple bar chart
import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { transactions } from '@/data/transactions';
import SummaryCard from '@/components/SummaryCard';

export default function StatisticsScreen({ navigation }: any) {
  const categories = useMemo(() => {
    const baseColors = ['#10B981', '#60A5FA', '#F59E0B', '#EF4444'];
    const totals: Record<string, number> = {};
    transactions.forEach(t => {
      const amount = parseFloat(t.amount.replace('€', '').replace(',', '.'));
      totals[t.category] = (totals[t.category] || 0) + amount;
    });
    const grand = Object.values(totals).reduce((sum, v) => sum + Math.abs(v), 0);
    return Object.entries(totals).map(([label, val], idx) => ({
      label,
      value: grand ? Math.round((val / grand) * 100) : 0,
      color: baseColors[idx % baseColors.length],
    }));
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Animation for bringing elements to life when the screen loads
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const selected = categories[selectedIndex];

  const chartData = {
    labels: categories.map((cat) => ""),
    datasets: [
      {
        data: categories.map((cat) => cat.value),
        colors: categories.map((cat) => () => cat.color),
      },
    ],
    barColors: categories.map((cat) => cat.color),
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

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <SummaryCard transactions={transactions} style={styles.slimSummaryCard} />

        {/* Gráfico e navegação (estrutura básica restaurada) */}
        <View style={[styles.chartContainer, { width: categories.length * 85 }]}>
          <BarChart
            data={chartData}
            width={categories.length * 85}
            height={200}
          fromZero
          showValuesOnTopOfBars
          withCustomBarColorFromData={true}
          flatColor={true}
          yAxisLabel=""
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: '#1f1f1f',
            backgroundGradientTo: '#1f1f1f',
            decimalPlaces: 0,
            barPercentage: 0.9,
            color: () => '#E7E7E7',
            fillShadowGradient: '#ffffff',
            fillShadowGradientOpacity: 0.6,
            labelColor: () => '#FFFFFF',
            propsForBackgroundLines: {
              stroke: '#333',
              strokeDasharray: '0',
              strokeOpacity: 0.4,
            },
          }}
            style={styles.chart}
          />
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={cat.label}
              style={styles.categoryBlock}
              onPress={() => {
              setSelectedIndex(index);
              setModalVisible(true);
            }}
          >
            <View
              style={[
                styles.gradientBlock,
                { backgroundColor: cat.color },
                index === selectedIndex && styles.activeGradientBlock,
              ]}
            >
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryValue}>
                {cat.value > 0 ? `+${cat.value}%` : `${cat.value}%`}
              </Text>
            </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {modalVisible && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selected.label}</Text>
              {transactions
                .filter(t => t.category === selected.label)
                .map(t => (
                  <View key={t.id} style={styles.detailRow}>
                    <Text style={styles.label}>{t.counterparty}</Text>
                    <Text style={styles.value}>{t.amount}</Text>
                  </View>
                ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    marginVertical: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  chart: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
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
  slimSummaryCard: {
    width: '95%',
    alignSelf: 'center',
  },
});