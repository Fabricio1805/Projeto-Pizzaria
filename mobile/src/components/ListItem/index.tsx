import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
}
const ListItem = ({data}: ItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.name} - {data.amount}
      </Text>

      <TouchableOpacity>
        <Feather name="trash" size={26} color="#FF3F4b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101026',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#8a8a8a'
  },
  item: {
    color: '#FFF',
    fontSize: 18
  }
});

export default ListItem;
