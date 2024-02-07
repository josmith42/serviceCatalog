import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import selectionsReducer from "./selectionsSlice"
import servicesReducer from "./servicesSlice"

export const store = configureStore({
  reducer: {
    selections: selectionsReducer,
    services: servicesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
