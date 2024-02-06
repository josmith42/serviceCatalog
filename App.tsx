import SelectionsScreen from './src/screens/SelectionsScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from './src/components/appTheme'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalAppBar from './src/components/GlobalAppBar';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator()

export default function App() {
  const theme = useAppTheme()
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar />
        <NavigationContainer theme={theme}>
          <Stack.Navigator
              initialRouteName='Selections'
              screenOptions={{ header: (props) => <GlobalAppBar {...props} /> }} >
            <Stack.Screen name="Selections" component={SelectionsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
