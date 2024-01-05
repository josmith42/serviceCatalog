import { Text, View } from '../../components/Themed';
import { Piece } from '../types/Piece';

export interface PieceViewData {
  piece: Piece;
}

export const PieceView = (props: PieceViewData) => {
  return (
    <View
      style={{ margin: 4, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 4 }}
    >
      <Text>{props.piece.title}</Text>
      <Text>{props.piece.composer_id}</Text>
    </View>
  );
};
