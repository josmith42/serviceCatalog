import { StyleSheet } from 'react-native';

import { FlatList } from 'react-native';
import { SelectionView } from '../components/SelectionView';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchSelectionsThunk, selectSelections } from '../redux/selectionsSlice';
import { useEffect } from 'react';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { ErrorScreen } from '../components/ErrorScreen';

export default function SelectionsScreen() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSelectionsThunk())
  }, [])
  const selections = useAppSelector(selectSelections)
  
  switch(selections.viewState.status) {
    case "loading":
      return (<LoadingScreen />)
    case "idle":
      return (<FlatList
        data={selections.viewState.value}
        renderItem={({ item }) => (
          <SelectionView selection={item} />
        )}
      />)
    case "error":
      return (
        <ErrorScreen
          message={'There was an error fetching data from the server'}
          details={selections.viewState.message}
        />
      )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
