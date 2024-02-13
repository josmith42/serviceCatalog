import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ServiceDetailsScreen } from "../screens/ServiceDetailsScreen"
import { DrawerNavigator } from "./DrawerNavigator"
import StackNavAppBar from "../components/StackNavAppBar"

export type RootStackParamList = {
  DrawerNavigator: undefined
  ServiceDetails: { serviceId: number }
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ header: (props) => <StackNavAppBar {...props} /> }} >
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
        </Stack.Navigator>
    )
}