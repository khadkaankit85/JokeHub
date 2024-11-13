import { Text } from "react-native-paper";
import { ScrollView } from "react-native";

const HomeHeader = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>JOKES</Text>
      <Text style={styles.subtitle}>15000+ Jokes Collection</Text>
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    height: 1 / 10,
    flex: 1 / 2,
    backgroundColor: "orange",
  },
  title: {
    display: "flex" as "flex",
    textAlign: "center" as "center",
    fontSize: 50,
    fontFamily: "SpaceMono",
  },
  subtitle: {
    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    color: "white",
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
};

export default HomeHeader;
