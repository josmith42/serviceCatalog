import SelectionsScreen from './src/screens/SelectionsScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from './src/components/appTheme'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalAppBar from './src/components/GlobalAppBar';
import { StatusBar } from 'expo-status-bar';
import ServicesScreen from './src/screens/ServicesScreen';
import { ServiceDetailsScreen } from './src/screens/ServiceDetailsScreen';

export type RootStackParamList = {
  Services: undefined
  Selections: undefined
  ServiceDetails: { serviceId: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const theme = useAppTheme()
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar />
        <NavigationContainer theme={theme}>
          <Stack.Navigator
              initialRouteName='Services'
              screenOptions={{ header: (props) => <GlobalAppBar {...props} /> }} >
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="Selections" component={SelectionsScreen} />

            <Stack.Screen
              name="ServiceDetails"
              component={ServiceDetailsScreen}
              options={{ title: 'Service Details' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
