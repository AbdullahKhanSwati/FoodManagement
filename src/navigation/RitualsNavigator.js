const React = require('react');
const { createNativeStackNavigator } = require('@react-navigation/native-stack');
const RitualsHomeScreen = require('../screens/Rituals/RitualsHomeScreen');
const CreateRoutineScreen = require('../screens/Rituals/CreateRoutineScreen');
const EditRoutineScreen = require('../screens/Rituals/EditRoutineScreen');
const StartRoutineScreen = require('../screens/Rituals/StartRoutineScreen');
const colors = require('../theme/colors');

const Stack = createNativeStackNavigator();

function RitualsNavigator() {
  return React.createElement(
    Stack.Navigator,
    {
      screenOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: colors.softBackground },
      },
    },
    React.createElement(Stack.Screen, {
      name: 'RitualsHome',
      component: RitualsHomeScreen,
      options: { title: 'Rituals' },
    }),
    React.createElement(Stack.Screen, {
      name: 'CreateRoutine',
      component: CreateRoutineScreen,
      options: { title: 'Create Routine' },
    }),
    React.createElement(Stack.Screen, {
      name: 'EditRoutine',
      component: EditRoutineScreen,
      options: { title: 'Edit Routine' },
    }),
    React.createElement(Stack.Screen, {
      name: 'StartRoutine',
      component: StartRoutineScreen,
      options: { title: 'Start Routine' },
    })
  );
}

module.exports = RitualsNavigator;
