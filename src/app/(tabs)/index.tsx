import { StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { PieceView } from '../components/PieceView';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPiecesThunk, selectCatalog } from '../../features/catalog/catalogSlice';
import { useEffect } from 'react';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from 'react-native-paper'

export default function SelectionsScreen() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPiecesThunk())
  }, [])
  const catalog = useAppSelector(selectCatalog)
  
  switch(catalog.status) {
    case "loading":
      return (<ActivityIndicator animating={true} />)
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
        <Text>Error</Text>
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
