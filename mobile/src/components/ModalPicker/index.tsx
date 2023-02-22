import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const {width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const ModalPicker = ({options,handleCloseModal,selectedItem}:ModalPickerProps) => {

  const onPressItem = (item: CategoryProps) => {
    //console.log(item);
    selectedItem(item);
    handleCloseModal();
  };

  const option = options.map((item) => (
    <TouchableOpacity key={item.id} style={styles.option} onPress={() => onPressItem(item)} >
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>

      <View style={styles.content}>

        <ScrollView showsHorizontalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8a8a8a',
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: .8,
    borderTopColor: '#8a8a8a'

  },
  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026'
  }
});


export default ModalPicker;
