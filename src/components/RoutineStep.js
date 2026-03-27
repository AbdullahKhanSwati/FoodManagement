const React = require('react');
const {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = require('react-native');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');

const createStyles = (isDragging) => StyleSheet.create({
  container: {
    backgroundColor: isDragging ? colors.secondaryBackground : colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shadows.sm,
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  content: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: spacing.md,
  },
  iconButton: {
    padding: spacing.md,
  },
  dragHandle: {
    padding: spacing.md,
    justifyContent: 'center',
  },
});

function RoutineStep({
  stepNumber,
  stepTitle,
  description,
  onEdit,
  onDelete,
  isDragging = false,
}) {
  const styles = createStyles(isDragging);

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(
      View,
      { style: styles.numberBadge },
      React.createElement(Text, { style: styles.numberText }, stepNumber)
    ),
    React.createElement(
      View,
      { style: styles.content },
      React.createElement(Text, { style: styles.title }, stepTitle),
      description && React.createElement(Text, { style: styles.description }, description)
    ),
    React.createElement(
      View,
      { style: styles.actions },
      onEdit &&
        React.createElement(
          TouchableOpacity,
          { style: styles.iconButton, onPress: onEdit },
          React.createElement(Text, { style: { color: colors.primary } }, '✎')
        ),
      onDelete &&
        React.createElement(
          TouchableOpacity,
          { style: styles.iconButton, onPress: onDelete },
          React.createElement(Text, { style: { color: colors.error } }, '🗑')
        )
    )
  );
}

module.exports = RoutineStep;
