import { TouchableOpacity, Text, View } from "react-native";
import { ButtonProps } from "@/types";

//utility function
const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-violet-800";
    case "secondary":
      return "bg-neutral-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-emerald-500";
    case "outline":
      return "bg-transparent border-[0.5px] border-neutral-500";
    default:
      return "bg-violet-800";
  }
};
const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "secondary":
      return "text-neutral-400";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-emerald-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row p-3 justify-center items-center shadow shadow-neutral-100/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold text-white ${getTextVariantStyle(textVariant)} `}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
