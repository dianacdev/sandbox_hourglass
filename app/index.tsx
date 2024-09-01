import { Redirect } from "expo-router";
// import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
    // return(
    //     <SafeAreaView>
    //         <Text>Home</Text>
    //     </SafeAreaView>
    // )
    //main page below it redirects to the welcome page/onboarding page

    return <Redirect href={'/(auth)/welcome'}/>;
}

export default Page;