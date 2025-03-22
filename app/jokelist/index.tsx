import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { Text, Surface, IconButton } from "react-native-paper";
import { RootStackParamList } from "../../constants/types";
import { alljokes } from "../../constants/appdata";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ListItem {
  id: number;
  body: string;
  category: string;
  title: string;
  globalCategory: string;
}

const ListItem = ({ id, body, category, title, globalCategory }: ListItem) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "animal":
        return "paw";
      case "bar":
        return "glass-cocktail";
      case "blonde":
      case "blond":
        return "face-woman";
      case "children":
        return "baby-face";
      case "college":
        return "school";
      case "gross":
        return "emoticon-poop";
      case "insults":
        return "emoticon-angry";
      case "knock-knock":
        return "door";
      case "lawyer":
        return "scale-balance";
      case "medical":
        return "medical-bag";
      case "men & women":
        return "account-group";
      case "news & politics":
        return "newspaper";
      case "one-liners":
        return "format-quote-close";
      case "other & misc":
        return "dots-horizontal";
      case "puns":
        return "emoticon-wink";
      case "redneck":
        return "tractor";
      case "religious":
        return "church";
      case "sports":
        return "basketball";
      case "tech":
        return "laptop";
      case "yo mama":
        return "emoticon-mom";
      case "favorites":
        return "heart";
      default:
        return "emoticon-lol";
    }
  };

  return (
    <Pressable
      onPress={() => {
        navigator.navigate("jokepage", { category, id, globalCategory });
      }}
      style={({ pressed }) => [
        styles.listItemContainer,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Surface style={styles.listItem} elevation={2}>
        <View style={styles.iconContainer}>
          <IconButton
            icon={getCategoryIcon(category)}
            size={24}
            iconColor="#FF6B6B"
            style={styles.icon}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {body}
          </Text>
        </View>
        <IconButton
          icon="chevron-right"
          size={24}
          iconColor="#666666"
          style={styles.chevron}
        />
      </Surface>
    </Pressable>
  );
};

const JokelistLayout = () => {
  const route = useRoute();
  const { category } = route.params as { category: string };
  const [jokes, setJokes] = useState(alljokes);

  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({ headerTitle: category });

    return () => {
      nav.setOptions({ headerTitle: "" }); // Reset header title on unmount
    };
  }, [nav, category]);

  useEffect(() => {
    loadJokes();
  }, [category]);

  const loadJokes = async () => {
    if (category === "Favorites") {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          const favoritesList = JSON.parse(favorites);
          const favoriteJokes = alljokes.filter((joke) =>
            favoritesList.includes(joke.id)
          );
          setJokes(favoriteJokes);
        } else {
          setJokes([]);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        setJokes([]);
      }
    } else if (category !== "All") {
      setJokes(alljokes.filter((joke) => joke.category === category));
    } else {
      setJokes(alljokes);
    }
  };

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
      <SafeAreaView style={styles.container}>
        {jokes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <IconButton
              icon="heart-outline"
              size={48}
              iconColor="#FF6B6B"
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              {category === "Favorites"
                ? "No favorite jokes yet. Add some by tapping the heart icon while reading jokes!"
                : "No jokes found in this category."}
            </Text>
          </View>
        ) : (
          <FlatList
            onEndReached={handleReachedEnd}
            onEndReachedThreshold={0.5}
            data={jokeData}
            renderItem={(item) => (
              <ListItem
                key={item.item.id}
                id={item.item.id}
                body={item.item.body}
                category={item.item.category}
                title={item.item.title}
                globalCategory={category}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listContainer: {
    padding: 16,
  },
  listItemContainer: {
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    margin: 0,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#2D3436",
    marginBottom: 4,
  },
  body: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  chevron: {
    margin: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default JokelistLayout;
