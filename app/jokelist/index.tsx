import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

const JokelistLayout = () => {
  const route = useRoute();
  const { category } = route.params as { category: string };

  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({ headerTitle: category });
  }, [nav, category]);

  return (
    <SafeAreaView>
      <View>
        <Text>
          this is where you are gonna find the list of jokes about {category}{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default JokelistLayout;
