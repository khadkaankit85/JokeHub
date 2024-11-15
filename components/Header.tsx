import { useNavigation } from "expo-router";
import { Dimensions, Image, Pressable } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const Header = () => {
  const nav = useNavigation();

  return (
    <View
      style={{
        height: Dimensions.get("screen").height * 0.1,
        backgroundColor: "blue",
        width: "auto",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Pressable
        onPress={() => {
          nav.goBack();
        }}
      >
        <Image
          source={require("../../assets/images/backbutton.png")}
          style={{
            width: 35,
            height: 35,
            marginBottom: 5,
          }}
        />
      </Pressable>
    </View>
  );
};
export default Header;
