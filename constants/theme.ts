import { useColorScheme } from "react-native";

export const lightTheme = {
  colors: {
    primary: "#FF6B6B",
    background: "#F7F7F7",
    surface: "#FFFFFF",
    text: "#2D3436",
    textSecondary: "#666666",
    border: "#F0F0F0",
    accentBackground: "#FFF5F5",
    cardBackground: "#FFFFFF",
    icon: "#FF6B6B",
    iconSecondary: "#666666",
  },
};

export const darkTheme = {
  colors: {
    primary: "#FF6B6B",
    background: "#1A1A1A",
    surface: "#2D2D2D",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    border: "#3D3D3D",
    accentBackground: "#3D2D2D",
    cardBackground: "#2D2D2D",
    icon: "#FF6B6B",
    iconSecondary: "#B0B0B0",
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
};
