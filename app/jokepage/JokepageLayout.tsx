import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const JokepageLayout = () => {
  const route = useRoute<{
    key: string;
    name: string;
    params: { category: string };
  }>();

  return (
    <SafeAreaView>
      <View>
        <Text>this is where you read joke</Text>
      </View>
    </SafeAreaView>
  );
};

export default JokepageLayout;
