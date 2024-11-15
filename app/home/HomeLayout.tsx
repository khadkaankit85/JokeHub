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
    backgroundColor: "white", //007AFF a0d7e7 FFD700 possible next color
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
    fontFamily: "Delius",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    color: "black",
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },
});

export default HomeLayout;
