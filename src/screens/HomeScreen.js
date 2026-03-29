const React = require('react');
const {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} = require('react-native');
const Header = require('../components/Header');
const Button = require('../components/Button');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');
const { AuthContext } = require('../context/AuthContext');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  greetingCard: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  greetingContent: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
  supportText: {
    fontSize: 13,
    color: colors.secondaryText,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  actionCardsContainer: {
    marginBottom: spacing.xl,
  },
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardIcon: {
    fontSize: 28,
    color: colors.primary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  contentPadding: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
});

function HomeScreen({ navigation }) {
  const { user } = React.useContext(AuthContext);
  const userName = user?.name || 'User';
  const initial = userName.charAt(0).toUpperCase();

  const handleFoodSupportPress = () => {
    navigation.navigate('FoodSupport', { screen: 'MealSize' });
  };

  const handleSafeFoodsPress = () => {
    navigation.navigate('SafeFoods', { screen: 'SafeFoodsList' });
  };

  const handleRitualsPress = () => {
    navigation.navigate('Rituals', { screen: 'RitualsHome' });
  };

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Easy Eats',
      onMenuPress: () => navigation.openDrawer(),
    }),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false },
      React.createElement(
        View,
        { style: styles.contentPadding },
        React.createElement(
          View,
          { style: styles.greetingCard },
          React.createElement(
            View,
            { style: styles.avatar },
            React.createElement(Text, { style: styles.avatarText }, initial)
          ),
          React.createElement(
            View,
            { style: styles.greetingContent },
            React.createElement(Text, { style: styles.greetingTitle }, 'Good to see you'),
            React.createElement(Text, { style: styles.greetingSubtitle }, 'Welcome back, ' + userName),
            React.createElement(Text, { style: styles.supportText }, 'Take your time. This is a gentle space to support you with food, one small step at a time.')
          )
        ),
        React.createElement(
          View,
          { style: styles.actionCardsContainer },
          React.createElement(
            TouchableOpacity,
            { style: styles.actionCard, onPress: handleFoodSupportPress, activeOpacity: 0.8 },
            React.createElement(
              View,
              { style: styles.cardIconContainer },
              React.createElement(Text, { style: styles.cardIcon }, '🥣')
            ),
            React.createElement(Text, { style: styles.cardTitle }, 'Get a Food Suggestion'),
            React.createElement(Text, { style: styles.cardDescription }, 'Answer a few gentle questions and receive food ideas that match how you\'re feeling right now.'),
            React.createElement(Button, { title: 'Start', onPress: handleFoodSupportPress, variant: 'primary' })
          ),
          React.createElement(
            TouchableOpacity,
            { style: styles.actionCard, onPress: handleSafeFoodsPress, activeOpacity: 0.8 },
            React.createElement(
              View,
              { style: styles.cardIconContainer },
              React.createElement(Text, { style: styles.cardIcon }, '❤️')
            ),
            React.createElement(Text, { style: styles.cardTitle }, 'Safe Foods List'),
            React.createElement(Text, { style: styles.cardDescription }, 'View and manage your personal collection of foods that feel safe and comfortable.'),
            React.createElement(Button, { title: 'Open List', onPress: handleSafeFoodsPress, variant: 'primary' })
          ),
          React.createElement(
            TouchableOpacity,
            { style: styles.actionCard, onPress: handleRitualsPress, activeOpacity: 0.8 },
            React.createElement(
              View,
              { style: styles.cardIconContainer },
              React.createElement(Text, { style: styles.cardIcon }, '☀️')
            ),
            React.createElement(Text, { style: styles.cardTitle }, 'Rituals & Routines'),
            React.createElement(Text, { style: styles.cardDescription }, 'Create calming routines around meals to help structure your day.'),
            React.createElement(Button, { title: 'Explore', onPress: handleRitualsPress, variant: 'primary' })
          )
        )
      )
    )
  );
}

module.exports = HomeScreen;
