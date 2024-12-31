import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { registerUser } from '@/services/authService';

const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password);
      Alert.alert('Success', 'Account created successfully');
      router.push('/auth/login');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center bg-white px-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-6`}>Create an Account</Text>
      <Text style={tw`text-gray-600 text-center mb-10`}>
        Sign up to get started with our app.
      </Text>

      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 text-gray-800`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 text-gray-800`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        style={tw`w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 text-gray-800`}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        style={tw`w-full bg-blue-500 rounded-lg py-3 ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
        onPress={handleRegister}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-white text-center text-lg font-semibold`}>Register</Text>
        )}
      </TouchableOpacity>

      <Text
        style={tw`text-blue-500 mt-5 text-center`}
        onPress={() => router.push('/auth/login')}
      >
        Already have an account? <Text style={tw`font-bold`}>Login</Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
