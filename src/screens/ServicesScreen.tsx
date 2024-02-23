import { FlatList } from "react-native";
import { ServiceView } from "../components/ServiceView";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ServiceViewModel, fetchServicesThunk, selectServices } from "../redux/servicesSlice";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StateScreen } from "../components/StateScreen";
import { RootStackParamList } from "../navigation/RootNavigator";

type ServiceScreenNavProps = NativeStackNavigationProp<RootStackParamList, 'Services'>

export default function ServicesScreen({ navigation }: { navigation: ServiceScreenNavProps }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchServicesThunk())
  }, [])
  const servicesViewState = useAppSelector(selectServices)
  return (
    <StateScreen
      viewState={servicesViewState.viewState}
      onIdle={(services) => <ServicesList navigation={navigation} services={services} />}
    />
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