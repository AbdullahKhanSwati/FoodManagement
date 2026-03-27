const React = require('react');
const { createNativeStackNavigator } = require('@react-navigation/native-stack');
const MealSizeScreen = require('../screens/FoodSupport/MealSizeScreen');
const TemperatureScreen = require('../screens/FoodSupport/TemperatureScreen');
const FoodTypeScreen = require('../screens/FoodSupport/FoodTypeScreen');
const SuggestionsScreen = require('../screens/FoodSupport/SuggestionsScreen');
const colors = require('../theme/colors');

const Stack = createNativeStackNavigator();

function FoodSupportNavigator() {
  return React.createElement(
    Stack.Navigator,
    {
      screenOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: colors.softBackground },
      },
    },
    React.createElement(Stack.Screen, {
      name: 'MealSize',
      component: MealSizeScreen,
      options: { title: 'Meal Size' },
    }),
    React.createElement(Stack.Screen, {
      name: 'Temperature',
      component: TemperatureScreen,
      options: { title: 'Temperature' },
    }),
    React.createElement(Stack.Screen, {
      name: 'FoodType',
      component: FoodTypeScreen,
      options: { title: 'Food Type' },
    }),
    React.createElement(Stack.Screen, {
      name: 'Suggestions',
      component: SuggestionsScreen,
      options: { title: 'Suggestions' },
    })
  );
}

module.exports = FoodSupportNavigator;
