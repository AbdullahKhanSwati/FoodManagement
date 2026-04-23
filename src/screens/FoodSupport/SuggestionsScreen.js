const React = require('react');
const { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } = require('react-native');
const Header = require('../../components/Header');
const FoodCard = require('../../components/FoodCard');
const colors = require('../../theme/colors');
const { spacing } = require('../../theme/spacing');
const { getFoodSuggestions } = require('../../api/aiApi');
const { addSafeFood } = require('../../api/safeFoodsApi');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.secondaryText,
    fontSize: 16,
  }
});

function SuggestionsScreen({ navigation, route }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // We extract the params dynamically gathered from previous screens
  const { mealSize, selectedTemp, foodType } = route.params || {};

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const data = await getFoodSuggestions({ mealSize, temperature: selectedTemp, foodType });
      const newItems = Array.isArray(data?.data) ? data.data : data;
      setSuggestions(newItems);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSave = async (food) => {
    try {
      // Safely conform data to Mongoose Enum limits
      const validTypes = ['liquid', 'solid', 'unsure'];
      const validTemps = ['hot', 'cold', 'warm', 'frozen'];
      
      const parsedType = (food.type || '').toLowerCase();
      const parsedTemp = (food.temperature || '').toLowerCase();

      await addSafeFood({
        name: food.name,
        description: food.description,
        recipe: food.recipe || '',
        type: validTypes.includes(parsedType) ? parsedType : 'unsure',
        temperature: validTemps.includes(parsedTemp) ? parsedTemp : 'warm'
      });
      Alert.alert('Saved', `${food.name} has been added to your Safe Foods list.`);
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not save food.');
    }
  };

  const activeContent = loading ? (
    React.createElement(
      View,
      { style: styles.loadingContainer },
      React.createElement(ActivityIndicator, { size: 'large', color: colors.primary }),
      React.createElement(Text, { style: styles.loadingText }, 'Gathering gentle food ideas...')
    )
  ) : (
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false },
      React.createElement(
        View,
        { style: styles.content },
        React.createElement(
          View,
          { style: styles.titleSection },
          React.createElement(Text, { style: styles.title }, 'Suggested Foods'),
          React.createElement(Text, { style: styles.subtitle }, 'Based on your answers and your saved safe foods, here are 8 ideas.')
        ),

        ...suggestions.map((food, index) => (
          React.createElement(FoodCard, {
            key: index.toString(),
            name: food.name,
            description: food.description,
            type: food.type,
            temperature: food.temperature,
            onSave: () => handleSave(food),
          })
        ))
      )
    )
  );

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Easy Eats',
      showBack: true,
      onBackPress: () => navigation.goBack(),
    }),
    activeContent
  );
}

module.exports = SuggestionsScreen;
