import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { Text } from "react-native-paper";
import { alljokes } from "../../appdata";
import { RootStackParamList } from "@/constants/types";

interface ListItem {
  id: number;
  body: string;
  category: string;
  title: string;
  globalCategory: string;
}
const ListItem = ({ id, body, category, title, globalCategory }: ListItem) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() => {
        navigator.navigate("jokepage", { category, id, globalCategory });
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: Dimensions.get("screen").width * 0.95,
          height: 90,
          marginHorizontal: "auto",
          paddingTop: 4,
          paddingLeft: 4,
        }}
      >
        <Text
          style={{
            fontFamily: "PoppinsBold",
            fontSize: 20,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          numberOfLines={2}
        >
          {body}
        </Text>
      </View>
    </Pressable>
  );
};

const JokelistLayout = () => {
  const route = useRoute();
  const { category } = route.params as { category: string };

  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({ headerTitle: category });
  }, [nav, category]);

  let jokes = alljokes;

  if (category != "All") {
    jokes = alljokes.filter((joke) => joke.category == category);
  }

  const [jokefirstIndex, setJokeFirstIndex] = useState(0);
  const [jokelastIndex, setJokeLastIndex] = useState(200);

  const hasAnother100 = jokes.length - 1 - jokelastIndex > 100;
  const hasNoMoreJokes = jokes.length - 1 <= jokelastIndex;

  const hasFewMoreJokes = jokes.length - 1 - jokelastIndex;

  const jokeData = jokes.slice(jokefirstIndex, jokelastIndex);

  const handleReachedEnd = () => {
    if (hasAnother100) setJokeLastIndex((prev) => prev + 100);
    else if (hasNoMoreJokes) return;
    else if (!hasAnother100 && !hasNoMoreJokes && hasFewMoreJokes > 0)
      setJokeLastIndex((prev) => prev + hasFewMoreJokes);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          onEndReached={() => {
            handleReachedEnd();
          }}
          onEndReachedThreshold={1}
          data={jokeData}
          renderItem={(item) => {
            return (
              <ListItem
                key={item.item.id}
                id={item.item.id}
                body={item.item.body}
                category={item.item.category}
                title={item.item.title}
                globalCategory={category}
              />
            );
          }}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default JokelistLayout;
