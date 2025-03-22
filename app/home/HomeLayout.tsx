import CategoryCards from "@/components/CategoryCards";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import { Text, Surface, IconButton, Divider } from "react-native-paper";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesSection = () => {
  const navigation = useNavigation();
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favoritesList = JSON.parse(favorites);
        setFavoriteCount(favoritesList.length);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate("jokelist", { category: "Favorites" });
      }}
      style={({ pressed }) => [
        styles.favoritesContainer,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Surface style={styles.favoritesCard} elevation={2}>
        <View style={styles.favoritesContent}>
          <IconButton
            icon="heart"
            size={32}
            iconColor="#FF6B6B"
            style={styles.favoritesIcon}
          />
          <View style={styles.favoritesTextContainer}>
            <Text style={styles.favoritesTitle}>Favorite Jokes</Text>
            <Text style={styles.favoritesCount}>
              {favoriteCount} jokes saved
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
            iconColor="#666666"
            style={styles.chevron}
          />
        </View>
      </Surface>
    </Pressable>
  );
};

const HomeBody = () => {
  return (
    <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
      <FavoritesSection />
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionSubtitle}>Browse jokes by category</Text>
        </View>
        <CategoryCards />
      </View>
    </ScrollView>
  );
};

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>JokeHub</Text>
        <IconButton
          icon="information"
          size={16}
          iconColor="#666666"
          style={styles.infoButton}
        />
      </View>
    </View>
  );
};

const HomeLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <HomeHeader />
      <HomeBody />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  scrollBody: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    color: "#2D3436",
    letterSpacing: -0.3,
  },
  infoButton: {
    margin: 0,
  },
  favoritesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  favoritesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
  },
  favoritesContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  favoritesIcon: {
    margin: 0,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
  },
  favoritesTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  favoritesTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#2D3436",
    marginBottom: 4,
  },
  favoritesCount: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#666666",
  },
  chevron: {
    margin: 0,
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
    color: "#2D3436",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#666666",
  },
});

export default HomeLayout;
