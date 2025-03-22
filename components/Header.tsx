import { useNavigation } from "expo-router";
import { Dimensions, Image, Pressable, View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

const Header = () => {
  const nav = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Pressable
          onPress={() => {
            nav.goBack();
          }}
          style={styles.backButton}
        >
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor="#FF6B6B"
            style={styles.iconButton}
          />
        </Pressable>
        <Text style={styles.headerTitle}>JokeHub</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get("screen").height * 0.08,
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
  headerTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    color: "#2D3436",
  },
});

export default Header;
