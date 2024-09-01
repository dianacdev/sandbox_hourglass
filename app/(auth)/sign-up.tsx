import { ScrollView, View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";
import OAuth from "@/components/OAuth";


const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async() => {
    console.log(form);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="flex-1 bg-neutral-900">
        <View className="relative w-full h-[250px]">
          <Image source={images.DianaCLogo} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-bold absolute bottom-5 left-5">
            Create your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Example: Jane Doe"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: any) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Example: JaneDoe@gmail.com"
            icon={icons.email}
            value={form.email}
            onChangeText={(value:any) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value:any) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6"/>
          <OAuth/>
          <Link href="/log-in" className="mt-10 text-center text-neutral-400">
            <Text className="text-center">Already have an account? </Text>
            <Text className="text-center text-violet-400 underline">Log In</Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default Signup;
