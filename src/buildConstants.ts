//
// To populate the constants in this file, create an app.config.js at the root of the project with
// the following content:
//
// export default ({ config }) => ({
//   ...config,
//   extra: {
//      /* constants here */
//   }
// });

import Constants from 'expo-constants';
import { Platform } from 'react-native';

type DataSource = "mock" | "network"

export const DATA_SOURCE: DataSource = (Constants.expoConfig?.extra?.DATA_SOURCE as DataSource) || "mock"

// Default to localhost if URL isn't in app.config.js, or on android, the special
// IP address for emulators that forwards the traffic to the host machine.
export const SUPABASE_URL: string = (Constants.expoConfig?.extra?.SUPABASE_URL) ||
    Platform.OS === 'android' ? "http://10.0.2.2:54321" : "http://localhost:54321"

// Default to debug key for supabase
export const SUPABASE_KEY: string = (Constants.expoConfig?.extra?.SUPABASE_KEY) ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'