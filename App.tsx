import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from './src/components/appTheme'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  const theme = useAppTheme()
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar />

        <NavigationContainer theme={theme}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
