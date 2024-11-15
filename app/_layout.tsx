import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import HomeLayout from "./home/HomeLayout";
import JokepageLayout from "./jokepage/JokepageLayout";
import JokelistLayout from "./jokelist";
import Header from "@/components/Header";
import { View } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/modal",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins_Rubik_Mono_One/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins_Rubik_Mono_One/Poppins/Poppins-Bold.ttf"),
    Delius: require("../assets/fonts/Delius/Delius-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log("font not loaded");
    return null;
  }

  console.log("loaded");
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <PaperProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeLayout}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="jokepage"
          component={JokepageLayout}
          options={{
            headerShown: true,
            headerBackTitle: "back",
            headerTitle: "",
            headerTitleStyle: {
              fontFamily: "PoppinsBold",
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="jokelist"
          component={JokelistLayout}
          initialParams={{ category: "All" }}
          options={{
            headerShown: true,
            headerBackTitle: "back",
            headerTitle: "",
            headerTitleStyle: {
              fontFamily: "PoppinsBold",
              fontSize: 20,
            },
            // headerRight: () => {
            //   return (
            //     <FontAwesome.Button
            //       name="search"
            //       backgroundColor="transparent"
            //       size={30}
            //       color="#007AFF"
            //       onPress={() => {
            //         //  #Todo: add the funtionality for search bar
            //       }}
            //     />
            //   );
            // },
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
