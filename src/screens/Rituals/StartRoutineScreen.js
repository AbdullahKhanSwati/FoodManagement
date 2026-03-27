const React = require('react');
const { View, Text, StyleSheet, ScrollView, TouchableOpacity } = require('react-native');
const Header = require('../../components/Header');
const Button = require('../../components/Button');
const colors = require('../../theme/colors');
const { spacing, borderRadius, shadows } = require('../../theme/spacing');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBackground },
  content: { padding: spacing.lg, paddingTop: spacing.xl, alignItems: 'center' },
  stepNumber: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    ...shadows.lg,
  },
  timer: {
    fontSize: 60,
    fontWeight: '700',
    color: colors.white,
  },
  timerLabel: {
    fontSize: 14,
    color: colors.white,
    marginTop: spacing.md,
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonGroup: { flexDirection: 'row', gap: spacing.md, width: '100%', paddingBottom: spacing.xl },
  buttonWrapper: { flex: 1 },
});

function StartRoutineScreen({ navigation, route }) {
  const routine = route.params?.routine || { name: 'Routine', steps: [] };
  const steps = Array.isArray(routine.steps) ? routine.steps : [];
  const totalSteps = steps.length || 0;
  
  const [currentStep, setCurrentStep] = React.useState(1);
  const [timeLeft, setTimeLeft] = React.useState(0);

  // Initialize timer when step changes
  React.useEffect(() => {
    if (steps.length > 0 && currentStep <= steps.length) {
      const stepData = steps[currentStep - 1];
      setTimeLeft(stepData.timer || 0);
    } else {
      setTimeLeft(30); // fallback
    }
  }, [currentStep, steps]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.goBack();
    }
  };

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: routine.name,
      showBack: true,
      onBackPress: () => navigation.goBack(),
    }),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false, contentContainerStyle: { flexGrow: 1, justifyContent: 'center' } },
      React.createElement(
        View,
        { style: styles.content },
        React.createElement(Text, { style: styles.stepNumber }, 'Step ' + currentStep + ' of ' + totalSteps),
        React.createElement(Text, { style: styles.stepTitle }, steps.length > 0 ? steps[currentStep - 1].stepText : 'Step ' + currentStep),
        React.createElement(
          View,
          { style: styles.timerContainer },
          React.createElement(Text, { style: styles.timer }, timeLeft),
          React.createElement(Text, { style: styles.timerLabel }, 'seconds')
        ),
        React.createElement(
          View,
          { style: styles.descriptionContainer },
          React.createElement(Text, { style: styles.description }, 'Take your time with this step')
        ),
        React.createElement(
          View,
          { style: styles.buttonGroup },
          React.createElement(
            View,
            { style: styles.buttonWrapper },
            React.createElement(Button, {
              title: currentStep >= totalSteps ? 'Finish' : 'Next',
              onPress: handleNext,
              variant: 'primary',
            })
          )
        )
      )
    )
  );
}

module.exports = StartRoutineScreen;
