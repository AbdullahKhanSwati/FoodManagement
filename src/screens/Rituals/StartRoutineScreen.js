const React = require('react');
const { View, Text, StyleSheet, ScrollView, AppState, Platform } = require('react-native');
const Notifications = require('expo-notifications');
const { Audio } = require('expo-av');
const Header = require('../../components/Header');
const Button = require('../../components/Button');
const colors = require('../../theme/colors');
const { spacing, borderRadius, shadows } = require('../../theme/spacing');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.softBackground },
  content: { padding: spacing.lg, paddingTop: spacing.xl, alignItems: 'center' },
  stepNumber: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    ...shadows.lg,
  },
  timer: {
    fontSize: 60,
    fontWeight: '700',
    color: colors.white,
  },
  timerLabel: {
    fontSize: 14,
    color: colors.white,
    marginTop: spacing.md,
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonGroup: { flexDirection: 'row', gap: spacing.md, width: '100%', paddingBottom: spacing.xl },
  buttonWrapper: { flex: 1 },
});

function StartRoutineScreen({ navigation, route }) {
  const routine = route.params?.routine || { name: 'Routine', steps: [] };
  const steps = React.useMemo(() => Array.isArray(routine.steps) ? routine.steps : [], [routine.steps]);
  const totalSteps = steps.length || 0;
  
  const [currentStep, setCurrentStep] = React.useState(1);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const endTimeRef = React.useRef(null);
  const appState = React.useRef(AppState.currentState);
  const notificationIdRef = React.useRef(null);
  
  const [isAlarmRinging, setIsAlarmRinging] = React.useState(false);
  const soundRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Please enable notifications in your phone settings to hear background alarms!');
      }
    })();
    return () => {
      stopAlarm();
    };
  }, []);

  const playAlarm = async () => {
    if (isAlarmRinging) return;
    setIsAlarmRinging(true);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg' },
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
    } catch (e) {
      console.log('Error playing alarm:', e);
    }
  };

  const stopAlarm = async () => {
    setIsAlarmRinging(false);
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  const cancelNotification = async () => {
    if (notificationIdRef.current) {
      await Notifications.cancelScheduledNotificationAsync(notificationIdRef.current);
      notificationIdRef.current = null;
    }
  };

  const scheduleNotification = async (seconds) => {
    await cancelNotification();
    if (seconds <= 0) return;
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Step Completed!",
        body: "Time is up for the current step.",
        sound: true,
      },
      trigger: { seconds },
    });
    notificationIdRef.current = id;
  };

  // Format seconds to mm:ss
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Initialize timer when step changes
  React.useEffect(() => {
    if (steps.length > 0 && currentStep <= steps.length) {
      const stepData = steps[currentStep - 1];
      setTimeLeft((stepData.timer || 0) * 60);
    } else {
      setTimeLeft(30 * 60); // fallback
    }
    setIsRunning(false);
    endTimeRef.current = null;
    cancelNotification();
    stopAlarm();
  }, [currentStep, steps]);

  // Handle precise background time calculation immediately upon foregrounding 
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (isRunning && endTimeRef.current) {
          const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
          setTimeLeft(remaining);
          if (remaining <= 0) {
            setIsRunning(false);
            endTimeRef.current = null;
            playAlarm();
          }
        }
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [isRunning]);

  // Timer interval using fixed end time
  React.useEffect(() => {
    let timer;
    if (isRunning) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }
      timer = setInterval(() => {
        if (endTimeRef.current) {
          const remaining = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
          setTimeLeft(remaining);
          if (remaining <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            endTimeRef.current = null;
            playAlarm();
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.goBack();
    }
  };

  const toggleTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
      return;
    }
    
    if (isRunning) {
      setIsRunning(false);
      endTimeRef.current = null;
      cancelNotification();
    } else {
      if (timeLeft > 0) {
        setIsRunning(true);
        scheduleNotification(timeLeft);
      }
    }
  };

  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Header, {
      title: routine.name,
      showBack: true,
      onBackPress: () => navigation.goBack(),
    }),
    React.createElement(
      ScrollView,
      { showsVerticalScrollIndicator: false, contentContainerStyle: { flexGrow: 1, justifyContent: 'center' } },
      React.createElement(
        View,
        { style: styles.content },
        React.createElement(Text, { style: styles.stepNumber }, 'Step ' + currentStep + ' of ' + totalSteps),
        React.createElement(Text, { style: styles.stepTitle }, steps.length > 0 ? steps[currentStep - 1].stepText : 'Step ' + currentStep),
        React.createElement(
          View,
          { style: styles.timerContainer },
          React.createElement(Text, { style: styles.timer }, formatTime(timeLeft))
        ),
        React.createElement(
          View,
          { style: styles.descriptionContainer },
          React.createElement(Text, { style: styles.description }, 'Take your time with this step')
        ),
        React.createElement(
          View,
          { style: styles.buttonGroup },
          React.createElement(
            View,
            { style: styles.buttonWrapper },
            React.createElement(Button, {
              title: isAlarmRinging ? 'Stop Alarm' : isRunning ? 'Pause' : 'Start',
              onPress: toggleTimer,
              variant: isAlarmRinging ? 'primary' : 'secondary',
            })
          ),
          React.createElement(
            View,
            { style: styles.buttonWrapper },
            React.createElement(Button, {
              title: currentStep >= totalSteps ? 'Finish' : 'Next',
              onPress: handleNext,
              variant: 'primary',
            })
          )
        )
      )
    )
  );
}

module.exports = StartRoutineScreen;
