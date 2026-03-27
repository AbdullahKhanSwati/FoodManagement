import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../context/AuthContext';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.softBackground,
  }
});

export default function AppNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
