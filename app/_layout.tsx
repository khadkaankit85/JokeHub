import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

import HomeLayout from "./home/HomeLayout";
import JokepageLayout from "./jokepage/JokepageLayout";
import JokelistLayout from "./jokelist";
import { Image, View } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/modal",
};

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

  const [isReady, setIsReady] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;

    // Add a timeout to ensure the splash screen stays for at least 2 seconds
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(timeout); // Clean up timeout on unmount
  }, [error]);

  if (!loaded || !isReady) {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/loader.gif")}
          width={800}
          height={800}
          style={{
            objectFit: "cover",
          }}
        />
      </View>
    );
  }

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
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
