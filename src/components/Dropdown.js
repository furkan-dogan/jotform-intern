import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';

const Dropdown = ({options, selectedOption, onSelect}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{selectedOption}</Text>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 60,
          }}>
          <FlatList
            data={options}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  toggleDropdown();
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;
