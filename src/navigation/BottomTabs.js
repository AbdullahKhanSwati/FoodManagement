// const React = require('react');
// const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
// const HomeScreen = require('../screens/HomeScreen');
// const FoodSupportNavigator = require('./FoodSupportNavigator');
// const SafeFoodsNavigator = require('./SafeFoodsNavigator');
// const RitualsNavigator = require('./RitualsNavigator');
// const colors = require('../theme/colors');

// const Tab = createBottomTabNavigator();

// function BottomTabs() {
//   return React.createElement(
//     Tab.Navigator,
//     {
//       screenOptions: ({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.secondaryText,
//         tabBarStyle: {
//           backgroundColor: colors.cardBackground,
//           borderTopColor: colors.border,
//           paddingBottom: 8,
//           paddingTop: 8,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '600',
//           marginTop: 4,
//         },
//       }),
//     },
//     React.createElement(Tab.Screen, {
//       name: 'HomeTab',
//       component: HomeScreen,
//       options: {
//         title: 'Home',
//         tabBarLabel: 'Home',
//       },
//     }),
//     React.createElement(Tab.Screen, {
//       name: 'FoodSupport',
//       component: FoodSupportNavigator,
//       options: {
//         title: 'Food',
//         tabBarLabel: 'Food',
//       },
//     }),
//     React.createElement(Tab.Screen, {
//       name: 'SafeFoods',
//       component: SafeFoodsNavigator,
//       options: {
//         title: 'Safe Foods',
//         tabBarLabel: 'Safe Foods',
//       },
//     }),
//     React.createElement(Tab.Screen, {
//       name: 'Rituals',
//       component: RitualsNavigator,
//       options: {
//         title: 'Rituals',
//         tabBarLabel: 'Rituals',
//       },
//     }),
//     React.createElement(Tab.Screen, {
//       name: 'Profile',
//       component: HomeScreen,
//       options: {
//         title: 'Profile',
//         tabBarLabel: 'Profile',
//       },
//     })
//   );
// }

// module.exports = BottomTabs;





const React = require('react');
const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
const { useSafeAreaInsets } = require('react-native-safe-area-context');
const { Ionicons } = require('@expo/vector-icons');
const HomeScreen = require('../screens/HomeScreen');
const FoodSupportNavigator = require('./FoodSupportNavigator');
const SafeFoodsNavigator = require('./SafeFoodsNavigator').default || require('./SafeFoodsNavigator');
const RitualsNavigator = require('./RitualsNavigator');
const colors = require('../theme/colors');

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const insets = useSafeAreaInsets(); // ← ADD THIS

  return React.createElement(
    Tab.Navigator,
    {
      screenOptions: ({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'HomeTab' || route.name === 'Profile') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'FoodSupport') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'SafeFoods') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Rituals') iconName = focused ? 'time' : 'time-outline';
          return React.createElement(Ionicons, { name: iconName, size, color });
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom + 8, // ← FIXED (was hardcoded 8)
          paddingTop: 8,
          height: 60 + insets.bottom,       // ← FIXED (was hardcoded 60)
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }),
    },
    // ... rest of your Tab.Screen items unchanged
    React.createElement(Tab.Screen, {
      name: 'HomeTab',
      component: HomeScreen,
      options: { title: 'Home', tabBarLabel: 'Home' },
    }),
    React.createElement(Tab.Screen, {
      name: 'FoodSupport',
      component: FoodSupportNavigator,
      options: { title: 'Food', tabBarLabel: 'Food' },
    }),
    React.createElement(Tab.Screen, {
      name: 'SafeFoods',
      component: SafeFoodsNavigator,
      options: { title: 'Safe Foods', tabBarLabel: 'Safe Foods' },
    }),
    React.createElement(Tab.Screen, {
      name: 'Rituals',
      component: RitualsNavigator,
      options: { title: 'Rituals', tabBarLabel: 'Rituals' },
    }),
    React.createElement(Tab.Screen, {
      name: 'Profile',
      component: HomeScreen,
      options: { title: 'Profile', tabBarLabel: 'Profile' },
    })
  );
}

module.exports = BottomTabs;