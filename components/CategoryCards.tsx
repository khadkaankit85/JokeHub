import {
  Dimensions,
  ScrollView,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Text } from "react-native-paper";
import { categories } from "@/constants/categories";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/constants/types";

interface CategoryCardProps {
  imageLink: string;
  jokeCount: number;
  categoryTitle: string;
}

const CategoryCard = ({
  imageLink,
  jokeCount,
  categoryTitle,
}: CategoryCardProps) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => {
        navigator.navigate("jokepage", { category: categoryTitle });
      }}
      // style={({ hovered }) => [styles.button, { opacity: hovered ? 0.5 : 1 }]}
    >
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
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 4,
                fontFamily: "Poppins",
                fontWeight: "300",
              }}
            >
              {jokeCount} jokes
            </Text>
            <Image
              source={imageLink as unknown as ImageSourcePropType}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
              }}
            ></Image>
          </View>
          <Text
            style={{
              borderTopWidth: 2,
              marginTop: "auto",
              height: 40,
              textAlign: "center",
              textAlignVertical: "bottom",
              fontWeight: 900,
              fontSize: 15,
              paddingTop: 15,
              backgroundColor: "#fcd24b",
              borderBottomEndRadius: 8,
              borderBottomStartRadius: 8,
              color: "black",
              fontFamily: "Poppins",
            }}
          >
            {categoryTitle}
          </Text>
        </View>
      </View>
    </Pressable>
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
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          imageLink={category.imageLink}
          jokeCount={category.jokeCount}
          categoryTitle={category.name}
        />
      ))}
    </ScrollView>
  );
};

const styles = { button: {} };

export default CategoryCards;
