import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { getSafeFoods, deleteSafeFood } from '../../api/safeFoodApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
    marginTop: -2,
  },
  foodItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  foodMeta: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  deleteButton: {
    padding: spacing.sm,
    backgroundColor: '#ffebee',
    borderRadius: borderRadius.sm,
  },
  deleteButtonText: {
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: spacing.md,
  },
  retryText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyText: {
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: 16,
  }
});

function SafeFoodsListScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSafeFoods();
      if (result.success) {
        setFoods(result.data);
      } else {
        setError(result.message || 'Failed to fetch safe foods');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFoods();
    }, [])
  );

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Safe Food',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await deleteSafeFood(id);
              if (result.success) {
                // Remove from local state to reflect immediately
                setFoods(foods.filter(food => food._id !== id));
              } else {
                Alert.alert('Error', result.message || 'Failed to delete');
              }
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to delete item');
            }
          }
        }
      ]
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchFoods}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (foods.length === 0) {
      return <Text style={styles.emptyText}>No safe foods added yet. Click + to add some!</Text>;
    }

    return foods.map((food) => (
      <TouchableOpacity
        key={food._id}
        style={styles.foodItem}
        onPress={() => navigation.navigate('SafeFoodDetail', { foodId: food._id, food: food })}
      >
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodMeta}>{food.type} {food.temperature ? `• ${food.temperature}` : ''}</Text>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(food._id, food.name)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Safe Foods"
        onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Your Safe Foods</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddSafeFood')}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
}

export default SafeFoodsListScreen;
