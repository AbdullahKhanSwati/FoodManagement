import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { getSafeFoodById, deleteSafeFood } from '../../api/safeFoodApi';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBackground },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  label: { fontSize: 12, color: colors.secondaryText, fontWeight: '600', marginBottom: spacing.sm },
  value: { fontSize: 16, color: colors.primaryText, fontWeight: '700', marginBottom: spacing.lg, textTransform: 'capitalize' },
  description: { fontSize: 14, color: colors.primaryText, lineHeight: 20 },
  buttonGroup: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  buttonContainer: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#d32f2f', marginBottom: spacing.md },
});

function SafeFoodDetailScreen({ navigation, route }) {
  const { foodId, food: initialFood } = route.params;
  const [food, setFood] = useState(initialFood || null);
  const [loading, setLoading] = useState(!initialFood);
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchFood = async () => {
        if (!foodId) return;
        try {
          const result = await getSafeFoodById(foodId);
          if (isActive && result.success) {
            setFood(result.data);
          }
        } catch (error) {
          console.log('Failed to refresh food details', error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };
      fetchFood();
      return () => { isActive = false; };
    }, [foodId])
  );

  const handleDelete = () => {
    Alert.alert(
      'Delete Safe Food',
      `Are you sure you want to delete "${food?.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              const result = await deleteSafeFood(foodId);
              if (result.success) {
                navigation.goBack();
              } else {
                Alert.alert('Error', result.message || 'Failed to delete');
              }
            } catch (err) {
              Alert.alert('Error', err.message || 'An error occurred.');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Food Details" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.container}>
        <Header title="Food Details" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Food details not found.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Food Details"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* BOX 1: Food Details */}
          <View style={styles.card}>
            <Text style={styles.value}>{food.name}</Text>
            
            <Text style={styles.label}>TYPE: <Text style={{fontWeight: '400', color: colors.primaryText, textTransform: 'capitalize'}}>{food.type}</Text></Text>
            <Text style={[styles.label, { marginBottom: food.description ? spacing.lg : 0 }]}>TEMPERATURE: <Text style={{fontWeight: '400', color: colors.primaryText, textTransform: 'capitalize'}}>{food.temperature}</Text></Text>

            {food.description ? (
              <>
                <Text style={styles.label}>I LIKE THIS MEAL BECAUSE</Text>
                <Text style={styles.description}>{food.description}</Text>
              </>
            ) : null}
          </View>

          {/* BOX 2: Recipe/Preparation */}
          {food.recipe ? (
            <View style={styles.card}>
              <Text style={styles.label}>RECIPE & PREPARATION</Text>
              <Text style={styles.description}>{food.recipe}</Text>
            </View>
          ) : null}

          {/* CONTROL RINGS */}
          <View style={styles.buttonGroup}>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit Details"
                onPress={() => navigation.navigate('AddSafeFood', { isEditing: true, food })}
                variant="secondary"
                disabled={deleting}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Delete"
                onPress={handleDelete}
                variant="outline"
                loading={deleting}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SafeFoodDetailScreen;
