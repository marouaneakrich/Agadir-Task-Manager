import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agadir Task Manager</Text>
        <Text style={styles.subtitle}>2025</Text>
        <Text style={styles.description}>
          Manage your daily tasks, appointments, and reminders
        </Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.featureText}>📅 Administrative appointments</Text>
        <Text style={styles.featureText}>📚 Exam preparation</Text>
        <Text style={styles.featureText}>🏛️ CNSS declarations</Text>
        <Text style={styles.featureText}>🎯 Personal tasks</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.buttonText, styles.registerButtonText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Made for Agadir citizens 🇲🇦</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    color: '#3B82F6',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  features: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1E40AF',
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1E40AF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  registerButtonText: {
    color: '#1E40AF',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default WelcomeScreen;