import { StyleSheet } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { PieceView } from '../components/PieceView';
import { Piece } from '../types/Piece';

export const mockData: Piece[] = [
  { title: "Offertoire", composer: "Louis Raffy" },
  { title: "Prelude in F major", composer: "J.S. Bach" },
  { title: "Praeludium", composer: "Hermann Schroeder" },
];

export default function TabOneScreen() {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <PieceView piece={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
