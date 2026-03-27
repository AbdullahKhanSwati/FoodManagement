const React = require('react');
const {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} = require('react-native');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.secondaryBackground,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  badge: {
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  smallButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  outlineButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  whiteText: {
    color: colors.white,
  },
  primaryText: {
    color: colors.primary,
  },
});

function FoodCard({
  name,
  description,
  image,
  type,
  temperature,
  onSave,
  onTryAnother,
}) {
  return React.createElement(
    View,
    { style: styles.container },
    image && React.createElement(Image, { source: image, style: styles.image }),
    React.createElement(
      View,
      { style: styles.content },
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.name }, name),
        description && React.createElement(Text, { style: styles.description }, description)
      ),
      (type || temperature) &&
        React.createElement(
          View,
          { style: styles.badgesContainer },
          type &&
            React.createElement(
              View,
              { style: styles.badge },
              React.createElement(Text, { style: styles.badgeText }, type)
            ),
          temperature &&
            React.createElement(
              View,
              { style: styles.badge },
              React.createElement(Text, { style: styles.badgeText }, temperature)
            )
        ),
      (onSave || onTryAnother) &&
        React.createElement(
          View,
          { style: styles.footer },
          onSave &&
            React.createElement(
              TouchableOpacity,
              {
                style: [styles.smallButton, styles.saveButton],
                onPress: onSave,
              },
              React.createElement(
                Text,
                { style: [styles.buttonText, styles.whiteText] },
                'Save'
              )
            ),
          onTryAnother &&
            React.createElement(
              TouchableOpacity,
              {
                style: [styles.smallButton, styles.outlineButton],
                onPress: onTryAnother,
              },
              React.createElement(
                Text,
                { style: [styles.buttonText, styles.primaryText] },
                'Try Another'
              )
            )
        )
    )
  );
}

module.exports = FoodCard;
