/* eslint-disable react-hooks/rules-of-hooks */
const React = require('react');
const { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } = require('react-native');
const Header = require('../../components/Header');
const Button = require('../../components/Button');
const RoutineStep = require('../../components/RoutineStep');
const colors = require('../../theme/colors');
const { spacing, borderRadius } = require('../../theme/spacing');
const { updateRoutine, addStep, updateStep, deleteStep, deleteRoutine } = require('../../api/routineApi');

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
  stepsSection: { marginTop: spacing.xl, marginBottom: spacing.xl },
  stepsTitle: { fontSize: 16, fontWeight: '700', color: colors.primaryText, marginBottom: spacing.lg },
  addStepButton: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  addStepText: { color: colors.primary, fontWeight: '600' },
  buttonContainer: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg },
  stepForm: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepFormRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, marginBottom: spacing.sm },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.md },
  cancelText: { color: colors.error, fontWeight: '600' },
  saveStepText: { color: colors.primary, fontWeight: '700' },
  deleteRoutineButton: {
    marginTop: spacing.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteRoutineText: { color: colors.error }
});

function EditRoutineScreen({ navigation, route }) {
  const routine = route.params?.routine;
  if (!routine) {
    navigation.goBack();
    return null;
  }

  const routineId = routine._id;
  const [routineName, setRoutineName] = React.useState(routine.name || '');
  const [steps, setSteps] = React.useState(routine.steps || []);
  const [loading, setLoading] = React.useState(false);

  // Add Step State
  const [isAddingStep, setIsAddingStep] = React.useState(false);
  const [newStepText, setNewStepText] = React.useState('');
  const [newStepTimer, setNewStepTimer] = React.useState('1');

  // Edit Step State
  const [editingStepIndex, setEditingStepIndex] = React.useState(null);
  const [editingStepText, setEditingStepText] = React.useState('');
  const [editingStepTimer, setEditingStepTimer] = React.useState('1');

  const handleSaveRoutineName = async () => {
    if (!routineName.trim()) return;
    setLoading(true);
    try {
      if (routineName !== routine.name) {
        await updateRoutine(routineId, { name: routineName });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update routine name.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStep = async () => {
    if (!newStepText.trim()) return;
    setLoading(true);
    try {
      const res = await addStep(routineId, { stepText: newStepText, timer: parseInt(newStepTimer) || 0 });
      if (res.success) {
        setSteps(res.data?.steps || res.data?.data?.steps || []);
        setIsAddingStep(false);
        setNewStepText('');
        setNewStepTimer('1');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add step. Check 5 steps limit.');
    } finally {
      setLoading(false);
    }
  };

  const startEditStep = (step, index) => {
    setEditingStepIndex(index);
    setEditingStepText(step.stepText || '');
    setEditingStepTimer(step.timer ? step.timer.toString() : '0');
  };

  const handleSaveEditStep = async () => {
    if (editingStepIndex === null || !editingStepText.trim()) return;
    setLoading(true);
    try {
      const res = await updateStep(routineId, editingStepIndex, { stepText: editingStepText, timer: parseInt(editingStepTimer) || 0 });
      if (res.success) setSteps(res.data?.steps || res.data?.data?.steps || []);
      setEditingStepIndex(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update step.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStep = async (index) => {
    Alert.alert('Delete Step', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        setLoading(true);
        try {
          const res = await deleteStep(routineId, index);
          if (res.success) setSteps(res.data?.steps || res.data?.data?.steps || []);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to delete step.');
        } finally {
          setLoading(false);
        }
      }}
    ]);
  };

  const handleDeleteRoutine = () => {
    Alert.alert('Delete Routine', 'This will permanently delete the routine and its steps.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        setLoading(true);
        try {
          await deleteRoutine(routineId);
          navigation.goBack();
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to delete routine.');
        } finally {
          setLoading(false);
        }
      }}
    ]);
  };

  const renderStepForm = (text, setText, timer, setTimer, onCancel, onSave, isEditing) => (
    React.createElement(
      View,
      { style: styles.stepForm },
      React.createElement(
        View,
        { style: styles.stepFormRow },
        React.createElement(TextInput, { style: [styles.input, { flex: 2 }], placeholder: 'Step Details', value: text, onChangeText: setText }),
        React.createElement(TextInput, { style: [styles.input, { flex: 1 }], placeholder: 'Mins', value: timer, onChangeText: setTimer, keyboardType: 'numeric' })
      ),
      React.createElement(
        View,
        { style: styles.actionRow },
        React.createElement(TouchableOpacity, { onPress: onCancel }, React.createElement(Text, { style: styles.cancelText }, 'Cancel')),
        React.createElement(TouchableOpacity, { onPress: onSave }, React.createElement(Text, { style: styles.saveStepText }, isEditing ? 'Save' : 'Add'))
      )
    )
  );

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Edit Routine',
      showBack: true,
      onBackPress: () => navigation.goBack(),
    }),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false },
      React.createElement(
        View,
        { style: styles.content },
        React.createElement(
          View,
          { style: styles.inputContainer },
          React.createElement(Text, { style: styles.label }, 'Routine Name'),
          React.createElement(TextInput, {
            style: styles.input,
            value: routineName,
            onChangeText: setRoutineName,
            placeholderTextColor: colors.secondaryText,
          })
        ),
        React.createElement(
          View,
          { style: styles.stepsSection },
          React.createElement(Text, { style: styles.stepsTitle }, 'Steps (' + steps.length + '/5)'),
          
          steps.map((step, index) => {
            if (editingStepIndex === index) {
              return React.createElement(View, { key: index }, renderStepForm(editingStepText, setEditingStepText, editingStepTimer, setEditingStepTimer, () => setEditingStepIndex(null), handleSaveEditStep, true));
            }
            return React.createElement(RoutineStep, {
              key: index,
              stepNumber: index + 1,
              stepTitle: step.stepText || 'Unknown Step',
              description: step.timer ? 'Timer: ' + step.timer + 'm' : 'No timer',
              onEdit: () => startEditStep(step, index),
              onDelete: () => handleDeleteStep(index),
            });
          }),

          isAddingStep ? 
            renderStepForm(newStepText, setNewStepText, newStepTimer, setNewStepTimer, () => setIsAddingStep(false), handleCreateStep, false)
          : (
            steps.length < 5 && editingStepIndex === null &&
            React.createElement(
              TouchableOpacity,
              { style: styles.addStepButton, onPress: () => setIsAddingStep(true) },
              React.createElement(Text, { style: styles.addStepText }, '+ Add Step')
            )
          )
        )
      )
    ),
    React.createElement(
      View,
      { style: styles.buttonContainer },
      React.createElement(Button, {
        title: loading ? 'Processing...' : 'Save Routine Name & Exit',
        onPress: handleSaveRoutineName,
        disabled: loading || !routineName.trim()
      }),
      React.createElement(Button, {
        title: 'Delete Routine',
        onPress: handleDeleteRoutine,
        style: styles.deleteRoutineButton,
        textStyle: styles.deleteRoutineText,
        disabled: loading
      })
    )
  );
}

module.exports = EditRoutineScreen;
