import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryCardProps {
  imageLink: string;
  jokeCount?: number;
  categoryTitle: string;
}
const CategoryCard = ({}: CategoryCardProps) => {
  return (
    <Card
      style={{
        width: 200,
        height: 200,
        elevation: 5,
      }}
    >
      <Text>hello world</Text>
    </Card>
  );
};

const CategoryCards = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
      <CategoryCard imageLink="" jokeCount={1} categoryTitle="" />
    </SafeAreaView>
  );
};

export default CategoryCards;
