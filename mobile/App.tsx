import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/tabs/HomeScreen';
import { TransactionsScreen } from './src/screens/tabs/TransactionsScreen';
import { CardsScreen } from './src/screens/tabs/CardsScreen';
import StatisticsScreen from './src/screens/tabs/StatisticsScreen';
import { ProfileScreen } from './src/screens/tabs/ProfileScreen';
import { InicialScreen } from './src/screens/tabs/InicialScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { RegisterScreen } from './src/screens/auth/RegisterScreen';
import  {BudgetScreen}  from '@/screens/tabs/BudgetScreen';
import { GoalScreen } from './src/screens/tabs/GoalScreen';
import { MoreScreen } from './src/screens/tabs/MoreScreen';
import { CategoryTransactionsScreen } from './src/screens/tabs/CategoryTransactionsScreen';
import { CardsProvider } from './src/contexts/CardsContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'Cards') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Statistics') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#48BF73',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#222222',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 0,
            },
          }),
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Transactions' }} />
      <Tab.Screen name="Cards" component={CardsScreen} options={{ title: 'Cards' }} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Statistics' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'GemunuLibre-ExtraLight': require('./assets/fonts/GemunuLibre-ExtraLight.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CardsProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ 
              headerShown: false,
              gestureEnabled: false,
              gestureDirection: 'horizontal',
              animation: 'none'
            }}>
              <Stack.Screen name="Inicial" component={InicialScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="MainApp" component={TabNavigator} />
              <Stack.Screen name='Budget' component={BudgetScreen}/>
              <Stack.Screen name='Goals'  component={GoalScreen}/>
              <Stack.Screen name='More'  component={MoreScreen}/>
              <Stack.Screen
                name='CategoryTransactions'
                component={CategoryTransactionsScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </CardsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});
