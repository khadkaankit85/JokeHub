import React from "react";
import { View, Dimensions, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import JokepageLayout from ".";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function JokepageLayoutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Joke",
        header: () => {
          const nav = useNavigation();

          return (
            <View
              style={{
                height: Dimensions.get("screen").height * 0.1,
                backgroundColor: "blue",
                width: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pressable
                onPress={() => {
                  nav.goBack();
                }}
              >
                <Image
                  source={require("../../assets/images/backbutton.png")}
                  style={{
                    width: 35,
                    height: 35,
                    marginBottom: 5,
                  }}
                />
              </Pressable>
            </View>
          );
        },
      }}
    >
      <Stack.Screen
        name="listjokepage"
        component={JokepageLayout}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="readjokepage" component={JokepageLayout} />
    </Stack.Navigator>
  );
}
