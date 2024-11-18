import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { alljokes } from "@/constants/appdata.ts";
import GestureRecognizer from "react-native-swipe-gestures";

const JokepageLayout = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const topElement = useRef<ScrollView>(null);

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
    if (thatJoke != undefined) {
      setCurrentJokeIndex(thatJoke);
      // navigation.setOptions({
      //   headerTitle: currentJokeList[thatJoke].title || 404,
      // });
    }
  }, []);
  useEffect(() => {
    comeIn();
  }, [currentJokeIndex]);

  const onGetPreviousJoke = () => {
    if (currentJokeIndex && currentJokeIndex > 0) {
      topElement.current?.scrollTo({ x: 0, y: 0, animated: false });
      setCurrentJokeIndex((prev) => (prev !== undefined ? prev - 1 : 0));
    }
  };

  const onGetNextJoke = () => {
    if (
      currentJokeIndex != undefined &&
      currentJokeIndex + 1 < currentJokeList.length - 1
    ) {
      topElement.current?.scrollTo({ x: 0, y: 0, animated: false });
      setCurrentJokeIndex((prev) => (prev !== undefined ? prev + 1 : 0));
    }
  };

  const transAnimation = useRef(new Animated.Value(200)).current;
  const comeIn = () => {
    // Will change transAnimation value to 1 in 5 seconds
    Animated.timing(transAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  //TODO:implement save to localstorage so that accessing jokes of different catagory is faster next time

  return (
    <SafeAreaView>
      <Animated.View
        style={{
          transform: [{ translateX: transAnimation }],
        }}
      >
        <GestureRecognizer
          onSwipeLeft={() => onGetNextJoke()}
          onSwipeRight={() => {
            onGetPreviousJoke();
          }}
        >
          <ScrollView
            ref={topElement}
            style={{
              width: Dimensions.get("screen").width * 0.95,
              margin: "auto",
              minHeight: Dimensions.get("screen").height * 0.7,
              maxHeight: "auto",
            }}
          >
            {currentJokeIndex != undefined &&
              currentJokeList[currentJokeIndex] != undefined && (
                <>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width * 0.9,
                      minHeight: 60,
                      fontSize: 25,
                      fontFamily: "PoppinsBold",
                      textAlign: "center",
                      height: "auto",
                    }}
                  >
                    {currentJokeList[currentJokeIndex].title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 16,
                      zIndex: 100,
                    }}
                  >
                    {currentJokeList[currentJokeIndex].body}
                  </Text>
                </>
              )}
            <View>
              {/* <Button
              title="onGetNextJoke"
              onPress={() => {
                onGetNextJoke();
              }}
            />
            <Button
              title="onGetPreviousJoke"
              onPress={() => {
                onGetPreviousJoke();
              }}
            /> */}
            </View>
          </ScrollView>
        </GestureRecognizer>
      </Animated.View>
    </SafeAreaView>
  );
};

export default JokepageLayout;
