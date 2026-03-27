const React = require('react');
const { View, StyleSheet } = require('react-native');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  noPadding: {
    padding: 0,
    overflow: 'hidden',
  },
});

function Card({ children, style, variant = 'default' }) {
  const containerStyle = variant === 'noPadding'
    ? [styles.container, styles.noPadding]
    : styles.container;

  return React.createElement(
    View,
    { style: [containerStyle, style] },
    children
  );
}

module.exports = Card;
