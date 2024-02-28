import { FlatList, View } from "react-native";
import { ServiceView } from "../components/ServiceView";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ServiceViewModel, fetchServicesThunk, selectServices, setServicesFilterThunk, setSortByThunk } from "../redux/servicesSlice";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StateScreen } from "../components/StateScreen";
import { RootStackParamList } from "../navigation/RootNavigator";
import React from "react";
import { Button, Divider, IconButton, Modal, Portal, RadioButton, Searchbar, Text, useTheme } from "react-native-paper";
import { setSortModalDisplayed } from "../redux/servicesSlice";
import { DateSortDirection } from "../api/servicesApi";

type ServiceScreenNavProps = NativeStackNavigationProp<RootStackParamList, 'Services'>

export default function ServicesScreen({ navigation }: { navigation: ServiceScreenNavProps }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchServicesThunk())
  }, [])
  const servicesViewState = useAppSelector(selectServices)
  const theme = useTheme()

  return (
    <View>
      <FiltersModal isOpen={servicesViewState.isFilterMenuOpen} sortState={servicesViewState.sortState} />
      <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
        <Searchbar
          style={{ flex: 1 }}
          value={servicesViewState.filter}
          placeholder='Search services'
          onChangeText={text => dispatch(setServicesFilterThunk(text))} />
        <IconButton icon="filter-variant" onPress={() => dispatch(setSortModalDisplayed(true))} />
      </View>
      <Divider style={{ marginHorizontal: 4, marginTop: 12 }} />
      <StateScreen
        viewState={servicesViewState.servicesState}
        onIdle={(services) => <ServicesList navigation={navigation} services={services} />}
      />
    </View>
  )
}

function FiltersModal({ isOpen, sortState }: { isOpen: boolean, sortState: DateSortDirection }) {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => dispatch(setSortModalDisplayed(false))}
        contentContainerStyle={{ backgroundColor: theme.colors.background, margin: 20, padding: 12, borderRadius: 4 }}>
        <View>
          <Text style={theme.fonts.titleLarge}>Sort By</Text>
          <Divider style={{ marginVertical: 8 }} />

          <RadioButton.Group onValueChange={value => dispatch(setSortByThunk(value as DateSortDirection))} value={sortState}>
            <RadioButton.Item label="Date (descending)" value={"desc"} />
            <RadioButton.Item label="Date (ascending)" value={"asc"} />
          </RadioButton.Group>
          
          <Button onPress={() => dispatch(setSortModalDisplayed(false))}>Close</Button>
        </View>
      </Modal>
    </Portal>
  )
}

function ServicesList({ navigation, services }: { navigation: ServiceScreenNavProps, services: ServiceViewModel[] }) {
  return (
    <FlatList
      data={services}
      renderItem={({ item }) => (
        <ServiceView
          id={item.id}
          date={item.date}
          description={item.description}
          onPress={(id) => { navigation.navigate('ServiceDetails', { serviceId: id }) }} />
      )}
    />
  )
}