const React = require('react');
const {
  View,
  Text,
  StyleSheet,
  ScrollView,
} = require('react-native');
const Header = require('../components/Header');
const colors = require('../theme/colors');
const { spacing, borderRadius, shadows } = require('../theme/spacing');
const { AuthContext } = require('../context/AuthContext');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  contentPadding: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
  },
});

function ProfileScreen({ navigation }) {
  const { user } = React.useContext(AuthContext);
  const userName = user?.name || 'User';
  const initial = userName.charAt(0).toUpperCase();

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Profile',
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
          { style: styles.card },
          React.createElement(
            View,
            { style: styles.avatar },
            React.createElement(Text, { style: styles.avatarText }, initial)
          ),
          React.createElement(Text, { style: styles.name }, userName),
          React.createElement(Text, { style: styles.email }, user?.email || 'user@example.com'),
          React.createElement(Text, { style: styles.sectionTitle }, 'Account Details'),
          React.createElement(
            View,
            { style: styles.infoRow },
            React.createElement(Text, { style: styles.infoLabel }, 'Member Since'),
            React.createElement(Text, { style: styles.infoValue }, user?.joinDate || '2024')
          ),
          React.createElement(
            View,
            { style: styles.infoRow },
            React.createElement(Text, { style: styles.infoLabel }, 'Status'),
            React.createElement(Text, { style: styles.infoValue }, 'Active')
          )
        )
      )
    )
  );
}

module.exports = ProfileScreen;
