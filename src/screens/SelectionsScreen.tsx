import { StyleSheet } from 'react-native';

import { FlatList } from 'react-native';
import { PieceView } from '../components/PieceView';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchPiecesThunk, selectCatalog } from '../redux/catalogSlice';
import { useEffect } from 'react';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { ErrorScreen } from '../components/ErrorScreen';

export default function SelectionsScreen() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPiecesThunk())
  }, [])
  const catalog = useAppSelector(selectCatalog)
  
  switch(catalog.status) {
    case "loading":
      return (<LoadingScreen />)
    case "idle":
      return (<FlatList
        style={styles.container}
        data={catalog.value}
        renderItem={({ item }) => (
          <PieceView piece={item} />
        )}
      />)
    case "error":
      return (
        <ErrorScreen
          message={'There was an error fetching data from the server'}
          details={catalog.error}
        />
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
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
