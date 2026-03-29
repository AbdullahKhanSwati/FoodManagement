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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

const temperatures = [
  { id: 'hot', label: 'Hot' },
  { id: 'cold', label: 'Cold' },
  { id: 'warm', label: 'Warm' },
  { id: 'frozen', label: 'Frozen' },
];

function TemperatureScreen({ navigation, route }) {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 3;
  const mealSize = route.params?.mealSize || 'small';

  const currentOptions = temperatures.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const hasMore = (page + 1) * itemsPerPage < temperatures.length;

  const options = currentOptions.map((temp) =>
    React.createElement(QuestionOption, {
      key: temp.id,
      label: temp.label,
      isSelected: false,
      onPress: () => {
        navigation.navigate('FoodType', { mealSize, selectedTemp: temp.id });
      },
      variant: 'chip',
    })
  );

  if (hasMore) {
    options.push(
      React.createElement(QuestionOption, {
        key: 'more',
        label: 'More...',
        isSelected: false,
        onPress: () => setPage(page + 1),
        variant: 'chip',
      })
    );
  } else if (page > 0) {
    options.push(
      React.createElement(QuestionOption, {
        key: 'prev',
        label: 'Back...',
        isSelected: false,
        onPress: () => setPage(page - 1),
        variant: 'chip',
      })
    );
  }

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Food Support',
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
          React.createElement(Text, { style: styles.questionTitle }, 'Would you like to avoid any temperatures?'),
          React.createElement(Text, { style: styles.questionSubtitle }, 'Select all that apply to you.')
        ),
        React.createElement(View, { style: styles.chipsContainer }, ...options)
      )
    )
  );
}

module.exports = TemperatureScreen;
