import { Dimensions, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

interface CategoryCardProps {
  imageLink: string;
  jokeCount?: number;
  categoryTitle: string;
}

const CategoryCard = ({}: CategoryCardProps) => {
  return (
    <View
      style={{
        borderWidth: 1,
        backgroundColor: "white",
        width: Dimensions.get("screen").width / 2.4,
        height: Dimensions.get("screen").width / 2.4 + 20,
        padding: 8,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          flex: 1,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "MonoSpace",
            borderTopWidth: 2,
            marginTop: "auto",
            height: 50,
            textAlign: "center",
            textAlignVertical: "bottom",
            fontWeight: 900,
            fontSize: 15,
            paddingTop: 15,
            backgroundColor: "#00ABE7",
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
            color: "white",
          }}
        >
          ONE LINERS
        </Text>
      </View>
    </View>
  );
};

const CategoryCards = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        gap: 10,
      }}
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
    </ScrollView>
  );
};

export default CategoryCards;
