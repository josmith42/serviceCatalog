import { createDrawerNavigator } from "@react-navigation/drawer"
import DrawerNavAppBar from "../components/DrawerNavAppBar"
import ServicesScreen from "../screens/ServicesScreen"
import SelectionsScreen from "../screens/SelectionsScreen"

const Drawer = createDrawerNavigator()
export function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="ServicesScreen"
            screenOptions={{ header: (props) => <DrawerNavAppBar {...props} /> }} >
            <Drawer.Screen
                name="ServicesScreen"
                component={ServicesScreen}
                options={{title: "Services"}}/>
            <Drawer.Screen
                name="SelectionsScreen"
                component={SelectionsScreen}
                options={{title: "Selections"}}/>
        </Drawer.Navigator>
    )
}