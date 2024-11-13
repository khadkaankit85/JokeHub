import CategoryCards from "@/components/CategoryCards";
import HomeHeader from "@/components/HomeHeader";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const HomeBody = () => {
  return (
    <ScrollView style={styles.scrollview}>
      <CategoryCards />
    </ScrollView>
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
    backgroundColor: "#00ABE7",
  },
  scrollview: {
    flex: 1 - 1 / 8,
    backgroundColor: "transparent",
  },
});

export default HomeLayout;
