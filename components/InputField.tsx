import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="mr-2 w-full mt-1">
        <Text className={`text-lg text-white font-bold mb-3 ${labelStyle}`}>
          {label}
        </Text>
        <View
          className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border-[2px] border-neutral-100 focus:border-violet-400 ${containerStyle}`}
        >
            {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`}/>}
            <TextInput className={`rounded-full p-3 font-bold text-[15px] flex-1 ${inputStyle} text-left`} secureTextEntry={secureTextEntry} {...props}>

            </TextInput>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
