import { ScrollView, View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogInPress = async () => {
    console.log(form);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="flex-1 bg-neutral-900">
        <View className="relative w-full h-[250px]">
          <Image source={images.DianaCLogo} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-bold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Example: JaneDoe@gmail.com"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Log in"
            onPress={onLogInPress}
            className="mt-6"
          />
          <OAuth />
          <Link href="/sign-up" className="mt-10 text-center text-neutral-400">
            <Text className="text-center">Need an account? </Text>
            <Text className="text-center text-violet-400 underline">
              Sign Up
            </Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default Login;
