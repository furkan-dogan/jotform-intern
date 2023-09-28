import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';

const HeaderForms = ({onSearch}) => {
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    // Arama butonuna tıklanınca metin girişini görünür veya gizleriz.
    setTextInputVisible(!isTextInputVisible);

    // Metin girişi görünürken ve kapatıldığında, metin sıfırlanır ve arama işlemi başlatılır.
    if (isTextInputVisible) {
      setSearchText('');
      onSearch('');
    }
  };

  const handleTextInputChange = text => {
    // Metin girişi her değiştiğinde arama işlemini başlatırız.
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleSearchClick} style={styles.button}>
        <Image
          source={require('../assets/search_light.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {isTextInputVisible && (
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={handleTextInputChange}
          value={searchText}
        />
      )}
      <View>
        <Text style={styles.headerText}>Forms</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleSettingsClick()}
        style={styles.button}>
        <Image
          source={require('../assets/gear-filled.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const handleSettingsClick = () => {
  // Sağ butona tıklanınca yapılacak işlemleri burada tanımlayabilirsiniz
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0A1551',
    height: 104,
    paddingBottom: 10,
    justifyContent: 'space-between', // Sol ve sağ butonlar arasında boşluk bırakır
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 18,
    marginRight: 18,
  },
  icon: {
    tintColor: 'white',
  },
});

export default HeaderForms;
