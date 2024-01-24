import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '../../components/Themed';
import { Piece } from '../types/Piece';
import React from 'react';
import { StyleSheet } from 'react-native';

export interface PieceViewData {
  piece: Piece;
}

const handleClick = () => {
  console.log("clicked")
}

export const PieceView = (props: PieceViewData) => {
  return (
    <TouchableOpacity onPress={handleClick} style={{ margin: 4, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 4 }}>
        <Text style={styles.title}>{props.piece.title}</Text>
        <Text lightColor='rgba(64, 64, 64, 0.8)' darkColor='rgba(192, 192, 192, 0.8)'>{props.piece.composers.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
  }
})