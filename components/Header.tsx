import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { logoutUser } from "@/services/authService";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        router.replace("/auth/login");
    };

    return (
        <SafeAreaView style={tw`bg-blue-600`}>
            <View style={tw`flex-row items-center justify-between px-2`}>
                <Text style={tw`text-white text-2xl font-bold tracking-wide`}>
                    🚗 JumpMyCar
                </Text>

                <TouchableOpacity onPress={handleLogout} style={tw`p-2`}>
                    <FontAwesome name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



export default Header;
