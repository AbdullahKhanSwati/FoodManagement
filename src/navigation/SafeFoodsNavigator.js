import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafeFoodsListScreen from '../screens/SafeFoods/SafeFoodsListScreen';
import AddSafeFoodScreen from '../screens/SafeFoods/AddSafeFoodScreen';
import SafeFoodDetailScreen from '../screens/SafeFoods/SafeFoodDetailScreen';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

function SafeFoodsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.softBackground },
      }}
    >
      <Stack.Screen 
        name="SafeFoodsList" 
        component={SafeFoodsListScreen}
        options={{ title: 'Safe Foods' }}
      />
      <Stack.Screen 
        name="AddSafeFood" 
        component={AddSafeFoodScreen}
        options={{ title: 'Add Safe Food' }}
      />
      <Stack.Screen 
        name="SafeFoodDetail" 
        component={SafeFoodDetailScreen}
        options={{ title: 'Food Details' }}
      />
    </Stack.Navigator>
  );
}

export default SafeFoodsNavigator;
