import React from 'react';
import { List } from 'react-native-paper';
import { Selection } from '../model/Selection';
import { SelectionViewModel } from '../redux/selectionsSlice';

export interface SelectionViewData {
  selection: SelectionViewModel;
}

const handleClick = () => {
  console.log("clicked")
}

export const SelectionView = (props: SelectionViewData) => {

  return (
    <List.Item
      title={props.selection.title}
      description={props.selection.description}
      onPress={handleClick} />
  );
};
