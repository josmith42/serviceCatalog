import { createDrawerNavigator } from "@react-navigation/drawer"
import DrawerNavAppBar from "../components/DrawerNavAppBar"
import ServicesScreen from "../screens/ServicesScreen"
import SelectionsScreen from "../screens/SelectionsScreen"
import { Icon } from "react-native-paper"
import React from "react"

const Drawer = createDrawerNavigator()
export function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="ServicesScreen"
            screenOptions={{ header: (props) => <DrawerNavAppBar {...props} /> }} >
            <Drawer.Screen
                name="ServicesScreen"
                component={ServicesScreen}
                options={{
                    title: "Services",
                    drawerIcon: ({color, size}) => (
                       <Icon source="playlist-music" size={size} color={color} />
                    )
                }}/>
            <Drawer.Screen
                name="SelectionsScreen"
                component={SelectionsScreen}
                options={{
                    title: "Selections",
                    drawerIcon: ({color, size}) => (
                       <Icon source="music" size={size} color={color} />
                    )
                }}/>
        </Drawer.Navigator>
    )
}