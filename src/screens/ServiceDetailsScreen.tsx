import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../App";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { fetchServiceDetailsThunk, selectServiceDetails } from "../redux/serviceDetailsSlice";
import { StateScreen } from "../components/StateScreen";


export function ServiceDetailsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'ServiceDetails'>) {
    const { serviceId } = route.params
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchServiceDetailsThunk(serviceId))
    }, [])

    const serviceDetails = useAppSelector(selectServiceDetails)

    useEffect(() => {
        if (serviceDetails.viewState.status === "idle") {
            navigation.setOptions({ title: serviceDetails.viewState.value.date })
        }
    }, [serviceDetails.viewState])
    return (
        <StateScreen
            viewState={serviceDetails.viewState}
            onIdle={
                (service) => {
                    return (
                        <View>
                            <Text>{service.id}</Text>
                        </View>
                    )
                }
            }
        />
    );
}