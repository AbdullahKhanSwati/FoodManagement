const React = require('react');
const {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} = require('@react-navigation/drawer');
const {
  View,
  Text,
  StyleSheet,
} = require('react-native');
const BottomTabs = require('./BottomTabs');
const colors = require('../theme/colors');
const { spacing } = require('../theme/spacing');

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  drawerItemLabel: {
    marginLeft: spacing.lg,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
  },
  drawerStyle: {
    backgroundColor: colors.white,
    width: '75%',
  },
});

const { AuthContext } = require('../context/AuthContext');

function CustomDrawerContent(props) {
  const { logout } = React.useContext(AuthContext);
  
  return React.createElement(
    DrawerContentScrollView,
    props,
    React.createElement(
      View,
      { style: styles.drawerHeader },
      React.createElement(Text, { style: styles.headerTitle }, 'Easy Eats'),
      React.createElement(Text, { style: styles.headerSubtitle }, 'Your eating companion')
    ),
    React.createElement(DrawerItemList, props),
    React.createElement(DrawerItem, {
      label: 'Get a Suggestion',
      labelStyle: styles.drawerItemLabel,
      onPress: () => props.navigation.navigate('MainTabs', { screen: 'FoodSupport' }),
    }),
    React.createElement(DrawerItem, {
      label: 'Safe Foods',
      labelStyle: styles.drawerItemLabel,
      onPress: () => props.navigation.navigate('MainTabs', { screen: 'SafeFoods' }),
    }),
    React.createElement(DrawerItem, {
      label: 'Routines',
      labelStyle: styles.drawerItemLabel,
      onPress: () => props.navigation.navigate('MainTabs', { screen: 'Rituals' }),
    }),
    React.createElement(DrawerItem, {
      label: 'Log Out',
      labelStyle: [styles.drawerItemLabel, { color: colors.error }],
      onPress: () => logout(),
    })
  );
}

function DrawerNavigator() {
  return React.createElement(
    Drawer.Navigator,
    {
      drawerContent: (props) => React.createElement(CustomDrawerContent, props),
      screenOptions: {
        headerShown: false,
        drawerStyle: styles.drawerStyle,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.secondaryText,
      },
    },
    React.createElement(Drawer.Screen, {
      name: 'MainTabs',
      component: BottomTabs,
      options: {
        title: 'Home',
      },
    })
  );
}

module.exports = DrawerNavigator;
