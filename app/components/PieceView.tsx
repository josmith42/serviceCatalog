import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../../components/Themed';
import { Piece } from '../types/Piece';

export interface PieceViewData {
  piece: Piece;
}

const handleClick = () => {
  console.log("clicked")
}

export const PieceView = (props: PieceViewData) => {
  return (
    <TouchableOpacity onPress={handleClick} style={{ margin: 4, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 4 }}>
        <Text>{props.piece.title}</Text>
        <Text>{props.piece.composer_id}</Text>
    </TouchableOpacity>
  );
};
