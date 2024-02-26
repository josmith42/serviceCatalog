import { FlatList, View } from "react-native";
import { ServiceView } from "../components/ServiceView";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ServiceViewModel, fetchServicesThunk, selectServices, setServicesFilterThunk } from "../redux/servicesSlice";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StateScreen } from "../components/StateScreen";
import { RootStackParamList } from "../navigation/RootNavigator";
import React from "react";
import { Divider, Searchbar } from "react-native-paper";

type ServiceScreenNavProps = NativeStackNavigationProp<RootStackParamList, 'Services'>

export default function ServicesScreen({ navigation }: { navigation: ServiceScreenNavProps }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchServicesThunk())
  }, [])
  const servicesViewState = useAppSelector(selectServices)
  return (
    <View>
      <Searchbar
        style={{ marginHorizontal: 8 }}
        value={servicesViewState.filter}
        placeholder='Search services'
        onChangeText={text => dispatch(setServicesFilterThunk(text))} />
      <Divider style={{ marginHorizontal: 4, marginTop: 12 }} />
      <StateScreen
        viewState={servicesViewState.servicesState}
        onIdle={(services) => <ServicesList navigation={navigation} services={services} />}
      />
    </View>
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