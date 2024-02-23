
import { FlatList } from 'react-native';
import { SelectionView } from '../components/SelectionView';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { SelectionsViewState, fetchSelectionsThunk, selectSelections, setFilterThunk } from '../redux/selectionsSlice';
import { useEffect } from 'react';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { ErrorScreen } from '../components/ErrorScreen';
import { Divider, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function SelectionsScreen() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSelectionsThunk());
  }, []);
  const selections = useAppSelector(selectSelections);

  return (
    <View>
      <Searchbar
        style={{ marginHorizontal: 8 }}
        value={selections.filter}
        placeholder='Search selections'
        onChangeText={text => dispatch(setFilterThunk(text))} />
      <Divider style={{ marginHorizontal: 4, marginTop: 12 }} />
      <SelectionsContent selections={selections} />
    </View>
  )
}

function SelectionsContent({ selections }: { selections: SelectionsViewState }) {
  switch (selections.selectionsState.status) {
    case "loading":
      return (<LoadingScreen />);
    case "idle":
      if (selections.selectionsState.value.length === 0) {
        return (
          <Text style={{ textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>No selections found</Text>
        )
      }
      return (<FlatList
        data={selections.selectionsState.value}
        renderItem={({ item }) => (
          <SelectionView selection={item} />
        )} />);
    case "error":
      return (
        <ErrorScreen
          message={'There was an error fetching data from the server'}
          details={selections.selectionsState.message} />
      );
  }
}

