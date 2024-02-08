import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../App";


export function ServiceDetailsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'ServiceDetails'>) {
    const { serviceId } = route.params
  return (
    <View>
      <Text>Service Details {serviceId}</Text>
    </View>
  );
}