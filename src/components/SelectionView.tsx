import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Selection } from '../model/Selection';

export interface SelectionViewData {
  selection: Selection;
}

const handleClick = () => {
  console.log("clicked")
}

export const SelectionView = (props: SelectionViewData) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
    },
  })

  return (
    <List.Item style={styles.container}
      title={props.selection.title}
      description={props.selection.composer}
      onPress={handleClick} />
  );
};
