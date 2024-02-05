import SelectionsScreen from './src/screens/SelectionsScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from './src/components/appTheme'
import { View } from 'react-native';

export default function App() {
  const theme = useAppTheme()
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <SelectionsScreen />
        </View>
      </PaperProvider>
    </Provider>
  );
}
