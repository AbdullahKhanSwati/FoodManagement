const React = require('react');
const {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} = require('react-native');
const colors = require('../theme/colors');
const { spacing, borderRadius } = require('../theme/spacing');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
  },
  secondary: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  small: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  medium: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primary,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  style 
}) {
  const isOutlineOrSecondary = variant === 'outline' || variant === 'secondary';
  const containerStyle = [
    styles.container,
    styles[variant],
    size === 'sm' && styles.small,
    disabled && styles.disabledContainer,
    style,
  ];

  return React.createElement(
    TouchableOpacity,
    {
      style: containerStyle,
      onPress: onPress,
      disabled: disabled || loading,
      activeOpacity: 0.8,
    },
    loading
      ? React.createElement(ActivityIndicator, {
          color: isOutlineOrSecondary ? colors.primary : colors.white,
        })
      : React.createElement(
          Text,
          {
            style: [
              styles.text,
              isOutlineOrSecondary ? styles.secondaryText : styles.primaryText,
            ],
          },
          title
        )
  );
}

module.exports = Button;
