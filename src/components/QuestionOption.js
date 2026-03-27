const React = require('react');
const {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} = require('react-native');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');

const createStyles = (isSelected, variant) => StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: isSelected ? colors.secondaryBackground : colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: isSelected ? 2 : 1,
    borderColor: isSelected ? colors.primary : colors.border,
    ...shadows.sm,
  },
  chip: {
    backgroundColor: isSelected ? colors.primary : colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.md,
    marginBottom: spacing.md,
    borderWidth: isSelected ? 0 : 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: isSelected
      ? variant === 'chip'
        ? colors.white
        : colors.primary
      : colors.primaryText,
  },
});

function QuestionOption({
  label,
  isSelected,
  onPress,
  variant = 'card',
}) {
  const styles = createStyles(isSelected, variant);
  const containerStyle = variant === 'chip' ? styles.chip : styles.card;

  return React.createElement(
    TouchableOpacity,
    {
      style: [styles.container, containerStyle],
      onPress: onPress,
      activeOpacity: 0.7,
    },
    React.createElement(
      View,
      { style: variant === 'chip' ? undefined : styles.content },
      React.createElement(
        Text,
        { style: styles.text },
        label
      )
    )
  );
}

module.exports = QuestionOption;
