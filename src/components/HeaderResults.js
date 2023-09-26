import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Navigation'ı içe aktarın

const HeaderResults = ({}) => {
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Navigation'ı kullanılabilir hale getirin

  const handleSearchClick = () => {
    // Arama butonuna tıklanınca metin girişini görünür veya gizleriz.
    if (!isTextInputVisible) {
      setTextInputVisible(true);
    }
  };

  const handleTextInputChange = text => {
    // Metin girişi her değiştiğinde arama işlemini başlatırız.
    setSearchQuery(text);
  };

  const handleBackClick = () => {
    // Geri butonuna tıklandığında Forms.js sayfasına geri dön
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <StatusBar />
      <TouchableOpacity onPress={() => handleBackClick()} style={styles.button}>
        <Image
          source={require('../assets/expand_down_light.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Results</Text>
      </View>
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
          value={searchQuery}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#43A6BB',
    padding: 40,
    justifyContent: 'space-between', // Sol ve sağ butonlar arasında boşluk bırakır
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default HeaderResults;
