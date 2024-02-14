import { StyleSheet } from 'react-native';

import { FlatList } from 'react-native';
import { SelectionView } from '../components/SelectionView';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchSelectionsThunk, selectSelections } from '../redux/selectionsSlice';
import { useEffect } from 'react';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { ErrorScreen } from '../components/ErrorScreen';
import { Divider, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { Selection } from '../model/Selection';
import { ViewStateContainer } from '../redux/ViewState';

export default function SelectionsScreen() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSelectionsThunk())
  }, [])
  const selections = useAppSelector(selectSelections)

  return (
    <View>
      <Searchbar style={{marginHorizontal:8}} value={""}/>
      <Divider style={{marginHorizontal:4, marginTop:12 }}/>
      <SelectionsContent selections={selections} />
    </View>
  )
}

function SelectionsContent({ selections }: { selections: ViewStateContainer<Selection[]> }) {
  switch (selections.viewState.status) {
    case "loading":
      return (<LoadingScreen />);
    case "idle":
      return (<FlatList
        data={selections.viewState.value}
        renderItem={({ item }) => (
          <SelectionView selection={item} />
        )} />);
    case "error":
      return (
        <ErrorScreen
          message={'There was an error fetching data from the server'}
          details={selections.viewState.message} />
      );
  }
}

