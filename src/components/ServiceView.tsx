import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export interface ServiceViewData {
    date: string;
    description: string;
}

export const ServiceView = (props: ServiceViewData) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
    },
  })

  return (
    <List.Item
      style={styles.container}
      title={props.date}
      description={props.description}
      descriptionNumberOfLines={0} />
  );
}