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

const foodTypes = [
  { id: 'grazing', label: 'Grazing' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'liquids', label: 'Liquids' },
  { id: 'unsure', label: "I don't mind" },
];

function FoodTypeScreen({ navigation, route }) {
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 3;
  const mealSize = route.params?.mealSize || 'small';
  const selectedTemp = route.params?.selectedTemp || 'none';

  const currentOptions = foodTypes.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const hasMore = (page + 1) * itemsPerPage < foodTypes.length;

  const options = currentOptions.map((type) =>
    React.createElement(QuestionOption, {
      key: type.id,
      label: type.label,
      isSelected: false,
      onPress: () => {
        navigation.navigate('Suggestions', { mealSize, selectedTemp, foodType: type.id });
      },
    })
  );

  if (hasMore) {
    options.push(
      React.createElement(QuestionOption, {
        key: 'more',
        label: 'More options...',
        isSelected: false,
        onPress: () => setPage(page + 1),
      })
    );
  } else if (page > 0) {
    options.push(
      React.createElement(QuestionOption, {
        key: 'prev',
        label: 'Previous options...',
        isSelected: false,
        onPress: () => setPage(page - 1),
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
          React.createElement(Text, { style: styles.questionTitle }, 'What type of food feels manageable right now?'),
          React.createElement(Text, { style: styles.questionSubtitle }, 'Choose what works best for you.')
        ),
        React.createElement(View, { style: styles.optionsContainer }, ...options)
      )
    )
  );
}

module.exports = FoodTypeScreen;
