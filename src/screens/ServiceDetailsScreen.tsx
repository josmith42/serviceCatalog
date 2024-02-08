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
    return (
        <StateScreen viewState={serviceDetails.viewState} >
            {(service) => (
                navigation.setOptions({ title: service.date }),
                <View>
                    <Text>{service.date}</Text>
                </View>
            )}
        </StateScreen>
    );
}