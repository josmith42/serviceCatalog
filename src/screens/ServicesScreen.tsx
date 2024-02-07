import { FlatList } from "react-native";
import { ServiceView } from "../components/ServiceView";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchServicesThunk, selectServices } from "../redux/servicesSlice";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

export default function ServicesScreen() {
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
            <ServiceView date={item.date} description={item.description} />
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