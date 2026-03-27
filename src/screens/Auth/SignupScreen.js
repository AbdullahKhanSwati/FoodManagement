import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBackground,
  },
  scrollContent: {
    flexGrow: 1,
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

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await registerUser(name, email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message);
    } else {
      Alert.alert('Success', 'Account created successfully! Please log in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    }
  };


  //  const handleSignup = async () => {
  //   const BASE_URL = 'https://food-support-ten.vercel.app/api/v1/';
  //   // 1. Validate inputs
  //   if (!name || !email || !password) {
  //     Alert.alert('Error', 'Please fill in all fields');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     Alert.alert('Error', 'Password must be at least 6 characters');
  //     return;
  //   }

  //   // 2. Call API
  //   setLoading(true);
  //   console.log("data is ",name,email,password);
  //   try {
  //     const response = await axios.post(
  //       `https://food-support-ten.vercel.app/api/v1/users/register`,
  //       { name, email, password },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );

  //     console.log('Register response:', response.data);

  //     // 3. Success → navigate to Login
  //     Alert.alert('Success', 'Account created! Please log in.', [
  //       { text: 'OK', onPress: () => navigation.navigate('Login') }
  //     ]);

  //   } catch (error) {
  //     // 4. Handle errors
  //     console.log('Signup error:', error);

  //     const message =
  //       error.response?.data?.message ||  // server error message
  //       error.message ||                   // axios error message
  //       'Something went wrong';

  //     Alert.alert('Registration Failed', message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  




  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us to start managing your daily comfort</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonSpace}>
          <Button 
            title="Sign Up" 
            onPress={handleSignup} 
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
