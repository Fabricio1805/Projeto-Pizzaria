import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: () => void;
}

const {width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const ModalPicker = ({options,handleCloseModal,selectedItem}:ModalPickerProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <Text>Pizzas</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  content: {
    width: WIDTH - 20
  }
});


export default ModalPicker;
