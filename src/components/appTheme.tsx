import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const AppLightTheme = MD3LightTheme
const AppDarkTheme = MD3DarkTheme

export function useAppTheme() {
    return useColorScheme() === 'dark' ? AppDarkTheme : AppLightTheme
}