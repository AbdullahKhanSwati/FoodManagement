import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { createSafeFood, updateSafeFood } from '../../api/safeFoodApi';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBackground },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  inputContainer: { marginBottom: spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: colors.primaryText, marginBottom: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    color: colors.primaryText,
    fontSize: 14,
  },
  buttonContainer: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20', // subtle tint
  },
  optionText: {
    color: colors.primaryText,
    fontSize: 14,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  }
});

const TYPES = ["liquid", "solid", "unsure"];
const TEMPERATURES = ["hot", "cold", "warm", "frozen"];

function AddSafeFoodScreen({ navigation, route }) {
  const isEditing = route.params?.isEditing;
  const existingFood = route.params?.food;

  const [foodName, setFoodName] = useState(existingFood?.name || '');
  const [description, setDescription] = useState(existingFood?.description || '');
  const [recipe, setRecipe] = useState(existingFood?.recipe || '');
  const [type, setType] = useState(existingFood?.type || 'solid');
  const [temperature, setTemperature] = useState(existingFood?.temperature || 'warm'); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingFood && existingFood.temperature) {
        if (!TEMPERATURES.includes(existingFood.temperature)) {
             setTemperature('warm');
        } else {
             setTemperature(existingFood.temperature);
        }
    }
  }, [existingFood]);

  const handleSave = async () => {
    if (!foodName.trim() || !type || !temperature) {
      Alert.alert('Validation Error', 'Food name, type, and temperature are required.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: foodName,
        description,
        recipe,
        type,
        temperature
      };

      let result;
      if (isEditing && existingFood?._id) {
        result = await updateSafeFood(existingFood._id, payload);
      } else {
        result = await createSafeFood(payload);
      }

      setLoading(false);

      if (result && result.success) {
        Alert.alert(
          'Success',
          `Food ${isEditing ? 'updated' : 'added'} successfully.`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Error', result?.message || 'Failed to save food');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', err.message || 'An error occurred while saving.');
    }
  };

  const renderOptions = (options, selectedValue, onSelect) => (
    <View style={styles.optionsRow}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={isEditing ? 'Edit Safe Food' : 'Add Safe Food'}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Oatmeal with berries"
              value={foodName}
              onChangeText={setFoodName}
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type *</Text>
            {renderOptions(TYPES, type, setType)}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Temperature *</Text>
            {renderOptions(TEMPERATURES, temperature, setTemperature)}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food description which includes recipes (Optional)</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Add ingredients, steps, or details here..."
              multiline={true}
              numberOfLines={4}
              value={recipe}
              onChangeText={setRecipe}
              placeholderTextColor={colors.secondaryText}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>I like this meal because</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Why does this meal work for you?"
              multiline={true}
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={colors.secondaryText}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title={isEditing ? 'Update Food' : 'Save Food'}
          onPress={handleSave}
          variant="primary"
          disabled={!foodName || loading}
          loading={loading}
        />
      </View>
    </View>
  );
}

export default AddSafeFoodScreen;
