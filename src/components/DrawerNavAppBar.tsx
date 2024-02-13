import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { DrawerHeaderProps } from '@react-navigation/drawer';

export default function DrawerNavAppBar({ navigation, route, options }: DrawerHeaderProps) {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}