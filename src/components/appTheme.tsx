import { useColorScheme } from "react-native";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const AppLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const AppDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export function useAppTheme() {
    const theme = useColorScheme()
    console.log(`useAppTheme: ${theme}`)
    return theme === 'dark' ? AppDarkTheme : AppLightTheme
}