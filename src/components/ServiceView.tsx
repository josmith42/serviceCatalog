import { List } from 'react-native-paper';

export interface ServiceViewData {
    date: string;
    description: string;
}

export const ServiceView = (props: ServiceViewData) => {
  return (
    <List.Item
      title={props.date}
      description={props.description}
      descriptionNumberOfLines={0}
      onPress={() => {console.log(`clicked ${props.date}`)}}/>
  );
}