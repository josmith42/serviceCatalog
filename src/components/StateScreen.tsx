import { ReactElement } from "react";
import { ViewState, ViewStateContainer } from "../redux/ViewState";
import { ErrorScreen } from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

interface StateScreenProps<T> {
    viewState: ViewState<T>,
    onIdle: (value: T) => ReactElement
}

export function StateScreen<T>({ viewState, onIdle }: StateScreenProps<T>): ReactElement {
    switch (viewState.status) {
        case "loading":
            return (<LoadingScreen />)
        case "idle":
            return (
                <>{onIdle(viewState.value)}</>
            )
        case "error":
            return (
                <ErrorScreen
                    message={'There was an error fetching data from the server'}
                    details={viewState.message}
                />
            )
    }
}