import { StyleSheet } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { PieceView } from '../components/PieceView';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPiecesThunk, selectCatalog } from '../../features/catalog/catalogSlice';
import { useEffect } from 'react';
import React from 'react';

export default function TabOneScreen() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPiecesThunk())
  }, [])
  const catalog = useAppSelector(selectCatalog)
  return (
    <FlatList
      data={catalog.value}
      renderItem={({ item }) => (
        <PieceView piece={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
