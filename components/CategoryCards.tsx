import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Text, Surface } from "react-native-paper";
import { categories } from "../constants/categories";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 48) / 3; // 3 items per row with 16px padding on each side and 16px gap

interface CategoryItemProps {
  jokeCount: number;
  categoryTitle: string;
}

const CategoryItem = ({ jokeCount, categoryTitle }: CategoryItemProps) => {
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
        return "emoticon-lol";
      default:
        return "emoticon-lol";
    }
  };

  return (
    <Pressable
      onPress={() => {
        navigator.navigate("jokelist", { category: categoryTitle });
      }}
      style={({ pressed }) => [
        styles.itemContainer,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Surface style={styles.item} elevation={1}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name={getCategoryIcon(categoryTitle)}
            size={20}
            color="#FF6B6B"
          />
          <Text style={styles.jokeCount}>{jokeCount}</Text>
        </View>
        <Text style={styles.categoryTitle} numberOfLines={1}>
          {categoryTitle}
        </Text>
      </Surface>
    </Pressable>
  );
};

const CategoryCards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            jokeCount={category.jokeCount}
            categoryTitle={category.name}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  itemContainer: {
    width: ITEM_WIDTH,
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  jokeCount: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    color: "#FF6B6B",
  },
  categoryTitle: {
    flex: 1,
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#2D3436",
  },
});

export default CategoryCards;
