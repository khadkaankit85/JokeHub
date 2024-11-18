import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Joke } from "@/constants/types";
import { alljokes } from "@/constants/appdata.ts";

const JokepageLayout = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { category, id, globalCategory } = route.params as {
    category: string;
    id: number;
    globalCategory: string;
  };
  let currentJokeList = alljokes;

  if (globalCategory != "All") {
    currentJokeList = alljokes.filter(
      (joke) => joke.category == globalCategory
    );
  }

  const [currentJokeIndex, setCurrentJokeIndex] = useState<number>();

  useEffect(() => {
    let thatJoke = currentJokeList.findIndex((joke) => joke.id == id);
    if (thatJoke) {
      setCurrentJokeIndex(thatJoke);
      navigation.setOptions({
        headerTitle: currentJokeList[thatJoke].title || 404,
      });
    }
  }, []);

  //TODO:implement save to localstorage so that accessing jokes of different catagory is faster next time

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: Dimensions.get("screen").width * 0.95,
          margin: "auto",
          minHeight: Dimensions.get("screen").height * 0.7,
          maxHeight: "auto",
        }}
      >
        {currentJokeIndex && currentJokeList[currentJokeIndex] != undefined && (
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 16,
              zIndex: 100,
            }}
          >
            {currentJokeList[currentJokeIndex].body}
          </Text>
        )}
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JokepageLayout;
