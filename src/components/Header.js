const React = require('react');
const {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = require('react-native');
const { useSafeAreaInsets } = require('react-native-safe-area-context');
const colors = require('../theme/colors');
const { spacing } = require('../theme/spacing');

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.softBackground,
  },
  container: {
    backgroundColor: colors.softBackground,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: spacing.md,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },
  rightAction: {
    padding: spacing.md,
  },
  buttonText: {
    fontSize: 20,
  },
});

function Header({
  title,
  subtitle,
  onMenuPress,
  onBackPress,
  showMenu = true,
  showBack = false,
  rightAction,
}) {
  const insets = useSafeAreaInsets();
  return React.createElement(
    View,
    { style: [styles.safeArea, { paddingTop: insets.top }] },
    React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        View,
        { style: styles.leftSection },
        showBack && onBackPress &&
          React.createElement(
            TouchableOpacity,
            { style: styles.menuButton, onPress: onBackPress },
            React.createElement(Text, { style: styles.buttonText }, '◀')
          ),
        showMenu && onMenuPress && !showBack &&
          React.createElement(
            TouchableOpacity,
            { style: styles.menuButton, onPress: onMenuPress },
            React.createElement(Text, { style: styles.buttonText }, '☰')
          ),
        React.createElement(
          View,
          { style: styles.content },
          React.createElement(Text, { style: styles.title }, title),
          subtitle && React.createElement(Text, { style: styles.subtitle }, subtitle)
        )
      ),
      rightAction &&
        React.createElement(
          TouchableOpacity,
          { style: styles.rightAction, onPress: rightAction.onPress },
          React.createElement(Text, { style: styles.buttonText }, '◎')
        )
    )
  );
}

module.exports = Header;
