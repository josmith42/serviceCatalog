import { FlatList } from "react-native";
import { ServiceView } from "../components/ServiceView";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchServicesThunk, selectServices } from "../redux/servicesSlice";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";


export default function ServicesScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Services'> ) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchServicesThunk())
  }, [])
  const services = useAppSelector(selectServices)
  switch(services.viewState.status) {
    case "loading":
      return (<LoadingScreen />)
    case "idle":
      return (<FlatList
        data={services.viewState.value}
        renderItem={({ item }) => (
            <ServiceView
              id={item.id}
              date={item.date}
              description={item.description}
              onPress={(id) => {navigation.navigate('ServiceDetails', { serviceId: id })}}/>
        )}
      />)
    case "error":
      return (
        <ErrorScreen
          message={'There was an error fetching data from the server'}
          details={services.viewState.message}
        />
      )
  }
}