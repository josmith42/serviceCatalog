import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Piece } from '../model/Piece';

export interface PieceViewData {
  piece: Piece;
}

const handleClick = () => {
  console.log("clicked")
}

export const PieceView = (props: PieceViewData) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
    },
  })

  return (
    <List.Item style={styles.container}
      title={props.piece.title}
      description={props.piece.composer}
      onPress={handleClick} />
  );
};
