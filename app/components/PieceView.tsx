import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../../components/Themed';
import { Piece } from '../types/Piece';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

export interface PieceViewData {
  piece: Piece;
}

const handleClick = () => {
  console.log("clicked")
}

export const PieceView = (props: PieceViewData) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleClick}
        style={styles.pieceView}
        android_ripple={{
          color: Colors[useColorScheme() ?? 'light'].selection,
        }}>
          <Text style={styles.title}>{props.piece.title}</Text>
          <Text lightColor='rgba(64, 64, 64, 0.8)' darkColor='rgba(192, 192, 192, 0.8)'>{props.piece.composers.name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pieceView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  title: {
    fontSize: 15,
  }
})