
import Constants from 'expo-constants';

type DataSource = "mock" | "localhost" | "remote"

export const DATA_SOURCE: DataSource = (Constants.expoConfig?.extra?.SC_DATA_SOURCE as DataSource) || "mock"