import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { loginUser } from '../../services/authService';
import { useRouter } from 'expo-router';
import tw from 'twrnc'; // Import twrnc

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await loginUser(email, password);
      const { user } = userCredential;
      login({ uid: user.uid, email: user.email });
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center bg-white px-6`}>
      <Text style={tw`text-2xl font-bold text-gray-800 mb-6`}>Welcome Back!</Text>
      <Text style={tw`text-gray-600 text-center mb-10`}>
        Please log in to continue to your account.
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

      <TouchableOpacity
        style={tw`w-full bg-blue-500 rounded-lg py-3 ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-white text-center text-lg font-semibold`}>Login</Text>
        )}
      </TouchableOpacity>

      <Text
        style={tw`text-blue-500 mt-5 text-center`}
        onPress={() => router.push('/auth/signup')}
      >
        Don't have an account? <Text style={tw`font-bold`}>Sign up</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
