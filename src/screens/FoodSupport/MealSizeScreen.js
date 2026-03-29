const React = require('react');
const { View, Text, StyleSheet, ScrollView } = require('react-native');
const Header = require('../../components/Header');
const QuestionOption = require('../../components/QuestionOption');
const Button = require('../../components/Button');
const colors = require('../../theme/colors');
const { spacing } = require('../../theme/spacing');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  questionSection: {
    marginBottom: spacing.xxl,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  questionSubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: spacing.xxl,
  },
  buttonContainer: {
    paddingBottom: spacing.xl,
  },
  contentPadding: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});

const mealSizes = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

function MealSizeScreen({ navigation }) {
  const handleOptionPress = (size) => {
    navigation.navigate('Temperature', { mealSize: size.id });
  };

  const options = mealSizes.map((size) =>
    React.createElement(QuestionOption, {
      key: size.id,
      label: size.label,
      isSelected: false,
      onPress: () => handleOptionPress(size),
    })
  );

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Easy Eats',
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
          { style: styles.questionSection },
          React.createElement(Text, { style: styles.questionTitle }, 'How much food can you manage right now?'),
          React.createElement(Text, { style: styles.questionSubtitle }, 'Choose what feels most comfortable for you.')
        ),
        React.createElement(View, { style: styles.optionsContainer }, ...options)
      )
    )
  );
}

module.exports = MealSizeScreen;
