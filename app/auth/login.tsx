import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { loginUser } from '../../services/authService';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const userCredential = await loginUser(email, password);
      const { user } = userCredential;
      login({ uid: user.uid, email: user.email });
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <TextInput
        style={{ padding: 10 }}
        className="border-b border-gray-300 mb-5"
        placeholder="Email"
        value={email ?? ''}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={{ padding: 10 }}
        className="border-b border-gray-300 mb-5"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        className="text-blue-500 mt-5 text-center"
        onPress={() => router.push('/auth/login')}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

export default LoginScreen;
