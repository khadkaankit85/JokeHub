import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

const HomeScreen = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
