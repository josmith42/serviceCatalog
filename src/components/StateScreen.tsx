import { ViewState, ViewStateContainer } from "../redux/ViewState";
import { ErrorScreen } from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";
import { Text } from "react-native";

interface StateScreenProps<T> {
    viewState: ViewState<T>,
    children: (t: T) => React.ReactNode
}

export function StateScreen<T>({ viewState, children }: StateScreenProps<T>) {
    switch (viewState.status) {
        case "loading":
            return (<LoadingScreen />)
        case "idle":
            return children(viewState.value)
        case "error":
            return (
                <ErrorScreen
                    message={'There was an error fetching data from the server'}
                    details={viewState.message}
                />
            )
    }
}