import { Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo'
// import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
    //main page below it redirects to the welcome page/onboarding page
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
      return <Redirect href={'/(root)/(tabs)/home'} />
    }

    return <Redirect href={'/(auth)/welcome'}/>;
}

export default Page;