const React = require('react');
const { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } = require('react-native');
const { useFocusEffect } = require('@react-navigation/native');
const Header = require('../../components/Header');
const Button = require('../../components/Button');
const colors = require('../../theme/colors');
const { spacing, borderRadius, shadows } = require('../../theme/spacing');
const { getRoutines } = require('../../api/routineApi');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBackground },
  content: { padding: spacing.lg, paddingTop: spacing.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.primaryText },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { fontSize: 28, color: colors.white, fontWeight: 'bold' },
  routineCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  routineIcon: { fontSize: 32, marginRight: spacing.lg },
  routineInfo: { flex: 1 },
  routineName: { fontSize: 16, fontWeight: '700', color: colors.primaryText, marginBottom: spacing.sm },
  routineSteps: { fontSize: 13, color: colors.secondaryText },
  actionButtons: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  smallButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
  },
  smallButtonText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  loader: { marginTop: spacing.xxl },
  emptyText: { textAlign: 'center', color: colors.secondaryText, marginTop: spacing.xl, fontSize: 16 },
});

function RitualsHomeScreen({ navigation }) {
  const [routines, setRoutines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchRoutines = async () => {
        try {
          const response = await getRoutines();
          if (isActive && response.success) {
            setRoutines(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch routines:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };
      
      setLoading(true);
      fetchRoutines();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const routineCards = routines.map((routine, index) => {
    // Alternate icons if not provided by backend
    const icon = index % 2 === 0 ? '☀️' : '🌙'; 
    const stepsCount = routine.steps ? routine.steps.length : 0;

    return React.createElement(
      View,
      { key: routine._id, style: styles.routineCard },
      React.createElement(Text, { style: styles.routineIcon }, icon),
      React.createElement(
        View,
        { style: styles.routineInfo },
        React.createElement(Text, { style: styles.routineName }, routine.name),
        React.createElement(Text, { style: styles.routineSteps }, stepsCount + ' steps')
      ),
      React.createElement(
        View,
        { style: styles.actionButtons },
        React.createElement(
          TouchableOpacity,
          {
            style: styles.smallButton,
            onPress: () => navigation.navigate('StartRoutine', { routine }),
          },
          React.createElement(Text, { style: styles.smallButtonText }, 'Start')
        ),
        React.createElement(
          TouchableOpacity,
          {
            style: [styles.smallButton, { backgroundColor: colors.secondaryBackground }],
            onPress: () => navigation.navigate('EditRoutine', { routine }),
          },
          React.createElement(Text, { style: [styles.smallButtonText, { color: colors.primary }] }, 'Edit')
        )
      )
    );
  });

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: 'Rituals & Routines',
      onMenuPress: () => navigation.openDrawer(),
    }),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false },
      React.createElement(
        View,
        { style: styles.content },
        React.createElement(
          View,
          { style: styles.header },
          React.createElement(Text, { style: styles.title }, 'Your Routines'),
          React.createElement(
            TouchableOpacity,
            {
              style: styles.addButton,
              onPress: () => navigation.navigate('CreateRoutine'),
            },
            React.createElement(Text, { style: styles.addButtonText }, '+')
          )
        ),
        loading 
          ? React.createElement(ActivityIndicator, { size: 'large', color: colors.primary, style: styles.loader })
          : routines.length === 0
            ? React.createElement(Text, { style: styles.emptyText }, "No routines found. Create one!")
            : React.createElement(View, null, ...routineCards)
      )
    )
  );
}

module.exports = RitualsHomeScreen;
