import {
  Dimensions,
  ScrollView,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Text } from "react-native-paper";
import { categories } from "../constants/categories";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types";

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
  const screenwidth = Dimensions.get("screen").width;
  const screenheight = Dimensions.get("screen").height;

  return (
    <Pressable
      onPress={() => {
        navigator.navigate("jokelist", { category: categoryTitle });
      }}
      // style={({ hovered }) => [styles.button, { opacity: hovered ? 0.5 : 1 }]}
    >
      <View
        style={{
          borderWidth: 2,
          backgroundColor: "white",
          width: screenwidth / 2.4,
          height: screenheight / 5,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            borderWidth: 0,
            flex: 1,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              height: "100%",
              textAlign: "center",
              fontWeight: 900,
              fontSize: 15,
              backgroundColor: "#fcd24b",
              borderBottomEndRadius: 8,
              borderBottomStartRadius: 8,
              color: "black",
              fontFamily: "Poppins",
              width: "100%",
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
