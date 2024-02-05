import SelectionsScreen from './src/screens/SelectionsScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SelectionsScreen />
    </Provider>
  );
}
