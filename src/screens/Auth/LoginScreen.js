/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: spacing.xxl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.primaryText,
    ...shadows.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.secondaryText,
    fontSize: 15,
  },
  link: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: spacing.xs,
  },
  buttonSpace: {
    marginTop: spacing.xl,
  }
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.message);
    }
    // Note: Success redirects are handled automatically via AuthContext changes in App.js
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue to FocusSpace</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonSpace}>
          <Button 
            title="Log In" 
            onPress={handleLogin} 
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
