const React = require('react');
const { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } = require('react-native');
const Header = require('../../components/Header');
const Button = require('../../components/Button');
const RoutineStep = require('../../components/RoutineStep');
const colors = require('../../theme/colors');
const { spacing, borderRadius } = require('../../theme/spacing');
const { createRoutine } = require('../../api/routineApi');

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
});

function CreateRoutineScreen({ navigation }) {
  const [routineName, setRoutineName] = React.useState('');
  const [steps, setSteps] = React.useState([]);
  const [isAddingStep, setIsAddingStep] = React.useState(false);
  const [stepText, setStepText] = React.useState('');
  const [stepTimer, setStepTimer] = React.useState('1');
  const [loading, setLoading] = React.useState(false);

  const handleSaveStep = () => {
    if (!stepText.trim()) return;
    setSteps([...steps, { id: Date.now(), stepText, timer: (parseInt(stepTimer) || 0) * 60 }]);
    setStepText('');
    setStepTimer('1');
    setIsAddingStep(false);
  };

  const handleCreateRoutine = async () => {
    if (!routineName || steps.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        name: routineName,
        steps: steps.map((s, index) => ({ stepText: s.stepText, timer: s.timer, order: index + 1 }))
      };
      await createRoutine(payload);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create routine', error);
      alert('Error creating routine');
    } finally {
      setLoading(false);
    }
  };

  const stepElements = steps.map((step, index) =>
    React.createElement(RoutineStep, {
      key: step.id,
      stepNumber: index + 1,
      stepTitle: step.stepText,
      description: `Timer: ${Math.floor(step.timer / 60)}m`,
      onEdit: null,
      onDelete: () => setSteps(steps.filter((s) => s.id !== step.id)),
    })
  );

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Create Routine',
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
            placeholder: 'Morning Routine',
            value: routineName,
            onChangeText: setRoutineName,
            placeholderTextColor: colors.secondaryText,
          })
        ),
        React.createElement(
          View,
          { style: styles.stepsSection },
          React.createElement(Text, { style: styles.stepsTitle }, 'Steps (' + steps.length + '/5)'),
          React.createElement(View, null, ...stepElements),
          isAddingStep ? (
            React.createElement(
              View,
              { style: styles.stepForm },
              React.createElement(
                View,
                { style: styles.stepFormRow },
                React.createElement(TextInput, { style: [styles.input, { flex: 2 }], placeholder: 'Step Details', value: stepText, onChangeText: setStepText }),
                React.createElement(TextInput, { style: [styles.input, { flex: 1 }], placeholder: 'Mins (1)', value: stepTimer, onChangeText: setStepTimer, keyboardType: 'numeric' })
              ),
              React.createElement(
                View,
                { style: styles.actionRow },
                React.createElement(TouchableOpacity, { onPress: () => setIsAddingStep(false) }, React.createElement(Text, { style: styles.cancelText }, 'Cancel')),
                React.createElement(TouchableOpacity, { onPress: handleSaveStep }, React.createElement(Text, { style: styles.saveStepText }, 'Save Step'))
              )
            )
          ) : (
            steps.length < 5 &&
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
        title: loading ? 'Saving...' : 'Save Routine',
        onPress: handleCreateRoutine,
        disabled: !routineName || steps.length === 0 || loading,
      })
    )
  );
}

module.exports = CreateRoutineScreen;
