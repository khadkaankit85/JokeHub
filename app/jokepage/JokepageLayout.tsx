import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Text, IconButton, Surface, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { alljokes } from "@/constants/appdata.ts";
import GestureRecognizer from "react-native-swipe-gestures";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JokepageLayout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);

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
      checkIfFavorite(id);
    }
  }, []);

  const checkIfFavorite = async (jokeId: number) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favoritesList = JSON.parse(favorites);
        setIsFavorite(favoritesList.includes(jokeId));
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const toggleFavorite = async () => {
    if (currentJokeIndex === undefined) return;

    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoritesList = favorites ? JSON.parse(favorites) : [];

      const currentJokeId = currentJokeList[currentJokeIndex].id;

      if (isFavorite) {
        favoritesList = favoritesList.filter(
          (id: number) => id !== currentJokeId
        );
      } else {
        favoritesList.push(currentJokeId);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: transAnimation }],
          },
        ]}
      >
        <GestureRecognizer
          onSwipeLeft={() => onGetNextJoke()}
          onSwipeRight={() => onGetPreviousJoke()}
        >
          <Surface style={styles.jokeCard} elevation={4}>
            <ScrollView
              ref={topElement}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {currentJokeIndex != undefined &&
                currentJokeList[currentJokeIndex] != undefined && (
                  <>
                    <Text style={styles.title}>
                      {currentJokeList[currentJokeIndex].title}
                    </Text>
                    <Text style={styles.body}>
                      {currentJokeList[currentJokeIndex].body}
                    </Text>
                  </>
                )}
            </ScrollView>
          </Surface>
        </GestureRecognizer>
      </Animated.View>

      <View style={styles.fabContainer}>
        <FAB
          icon={isFavorite ? "heart" : "heart-outline"}
          style={styles.fab}
          onPress={toggleFavorite}
          color={isFavorite ? "#FF6B6B" : "#666666"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  animatedContainer: {
    flex: 1,
  },
  jokeCard: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginBottom: 16,
    color: "#2D3436",
  },
  body: {
    fontFamily: "Poppins",
    fontSize: 16,
    lineHeight: 24,
    color: "#2D3436",
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  fab: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
  },
});

export default JokepageLayout;
