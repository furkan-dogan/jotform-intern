import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const ChartTypeDropdown = ({options, selectedOption, onSelect}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  // Dropdown'ı tekrar kapatmak için kullanılabilir
  const closeDropdown = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.selectedOptionContainer}>
          <Text style={styles.selectedOptionText}>{selectedOption}</Text>
          <Image
            style={styles.icon} // Stil ekledik
            source={require('../assets/expand_down_light-2.png')}
          />
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  closeDropdown(); // Dropdown'ı kapat
                }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1, // Ensures the dropdown appears above other content
    alignSelf: 'center', // Centers the dropdown
  },
  selectedOptionContainer: {
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 150,
    flexDirection: 'row',
  },
  selectedOptionText: {
    color: '#030D50',
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: '400',
    lineHeight: 15.51,
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: 'white', // Background color of the dropdown
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200, // Adjust the width as needed
    maxHeight: 200, // Set a max height to limit the dropdown's size
  },
  optionText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    alignContent: 'flex-end',
  },
  chartIcon: {
    width: 30, // İkonun boyutunu ayarlayın
    height: 30, // İkonun boyutunu ayarlayın
  },
});

export default ChartTypeDropdown;
