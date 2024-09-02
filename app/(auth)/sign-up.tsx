import { ScrollView, View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default", //This line can be altered for testing the verification process, "default", "pending","success"
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO!: Create a user in the DB
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed, please try again.",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="flex-1 bg-neutral-900">
        <View className="relative w-full h-[250px]">
          {/* <Image source={images.DianaCLogo} className="z-0 w-full h-[250px]" /> */}
          <Text className="text-2xl text-white font-bold absolute bottom-5 left-5">
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
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />
          <Link href="/log-in" className="mt-10 text-center text-neutral-400">
            <Text className="text-center">Already have an account? </Text>
            <Text className="text-center text-violet-400 underline">
              Log In
            </Text>
          </Link>
        </View>
        {/* This only appears when pending state has been set. */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="bg-neutral-800 px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-white text-3xl font-extrabold mb-2">
              Verification
            </Text>
            <Text className="text-base font-normal mb-5 text-gray-400 text-center">
              A verification code has been sent to your email ({form.email}).
              Please enter the code below.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code: any) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm  mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-blue-500"
            />
          </View>
        </ReactNativeModal>
        {/* This only appears when (verification) success state has been set. */}
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-neutral-800 px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-white text-3xl font-bold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 text-center">
              Account verified successfully!
            </Text>
            <CustomButton
              title="Exit to Home"
              onPress={() => router.push("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default Signup;
