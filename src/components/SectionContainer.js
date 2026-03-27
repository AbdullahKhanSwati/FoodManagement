const React = require('react');
const {
  View,
  StyleSheet,
  ScrollView,
} = require('react-native');
const colors = require('../theme/colors');
const { spacing } = require('../theme/spacing');

function SectionContainer({
  children,
  scrollable = true,
  paddingHorizontal = spacing.lg,
  paddingVertical = spacing.lg,
  backgroundColor = colors.softBackground,
  style,
}) {
  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor,
    },
    container: {
      paddingHorizontal,
      paddingVertical,
    },
  });

  if (scrollable) {
    return React.createElement(
      ScrollView,
      {
        style: styles.scrollView,
        showsVerticalScrollIndicator: false,
      },
      React.createElement(
        View,
        { style: [styles.container, style] },
        children
      )
    );
  }

  return React.createElement(
    View,
    { style: [styles.container, style] },
    children
  );
}

module.exports = SectionContainer;
