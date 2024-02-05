
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function GlobalAppBar({ route, options }: { route: any, options: any }) {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}