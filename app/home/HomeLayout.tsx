import CategoryCards from "@/components/CategoryCards";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const HomeBody = () => {
  return (
    <View style={styles.scrollBody}>
      <CategoryCards />
    </View>
  );
};

const HomeHeader = () => {
  return (
    <View style={styles.scrollHead}>
      <Text style={styles.title}>JOKES</Text>
      <Text style={styles.subtitle}>15000+ Jokes Collection</Text>
    </View>
  );
};

const HomeLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <HomeBody />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
  },
  scrollBody: {
    flex: 6 / 7,
    backgroundColor: "transparent",
  },
  scrollHead: {
    flex: 1 / 7,
  },
  title: {
    display: "flex" as "flex",
    textAlign: "center" as "center",
    fontSize: 50,
    fontFamily: "Poppins",
  },
  subtitle: {
    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins",
  },
});

export default HomeLayout;
