import { Piece } from '../api/dto/Piece';
import React from 'react';
import { StyleSheet } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { List } from 'react-native-paper';

export interface PieceViewData {
  piece: Piece;
}

const handleClick = () => {
  console.log("clicked")
}

export const PieceView = (props: PieceViewData) => {
//   const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
    //   backgroundColor: theme.colors.background
    },
  })

  return (
    <List.Item style={styles.container}
      title={props.piece.title}
      description={props.piece.composers.name}
      onPress={handleClick} />
  );
};
