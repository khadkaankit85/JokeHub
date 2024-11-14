import { Dimensions, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { categories } from "@/constants/categories";
import { ReactNode } from "react";

interface CategoryCardProps {
  imageLink: string;
  jokeCount: number;
  categoryTitle: string;
  id: number;
}

const CategoryCard = ({
  imageLink,
  jokeCount,
  categoryTitle,
  id,
}: CategoryCardProps) => {
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
            src={imageLink}
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
            height: 50,
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
          id={category.id}
          imageLink={category.imageLink}
          jokeCount={category.jokeCount}
          categoryTitle={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryCards;
