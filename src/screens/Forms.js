import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Modal from 'react-native-modal';

const API_URL = 'https://api.jotform.com/user/forms?apiKey=';

const Forms = ({}) => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [selectedFormTitle, setSelectedFormTitle] = useState(''); // Form başlığını saklayacak state
  const appKey = useSelector(state => state.appKey);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}${appKey}`)
      .then(response => {
        const {content} = response.data;
        setForms(content);
        setFilteredForms(content); // İlk başta tüm formları gösterir.
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }, [appKey]);

  const handleFormIdClick = selectedForm => {
    // Seçilen veriyi submissions.js sayfasına yönlendirdik
    navigation.navigate('Submissions', {selectedForm});
    setTimeout(() => {
      setModalVisible(false); // Modal'ı kapat (timeout sonrasında)
    }, 100);
    openModal();
  };

  const handleFormTitleClick = selectedForm => {
    setSelectedFormTitle(selectedForm.title); // Tıklanan form başlığını sakla
    openModal();
  };

  const handleSearch = searchText => {
    // Arama işlemini gerçekleştirir ve sonuçları filteredForms state'ine kaydeder.
    const filtered = forms.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredForms(filtered);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <Header onSearch={handleSearch} />
      <FlatList
        data={filteredForms}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleFormTitleClick(item);
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{left: 15}}>
                <Image
                  source={require('../assets/product-form-builder-color-border.png')}
                />
              </View>

              <View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subtitleText}>
                    {item.count} Submissions.{' '}
                  </Text>
                  <Text style={styles.subtitleText}>{item.created_at}</Text>
                </View>
              </View>

              <View style={{position: 'absolute', right: 15}}>
                <Image source={require('../assets/star-empty.png')} />
              </View>
            </View>

            {/* Modal */}
            <Modal isVisible={isModalVisible} backdropColor="#030D50">
              <View style={styles.modalContent}>
                <View style={styles.modalTop}>
                  <Image
                    source={require('../assets/product-form-builder-color-border.png')}
                  />
                  <Text style={styles.modalTitle}>{selectedFormTitle}</Text>
                  <Image source={require('../assets/xmark.png')} />
                  {/* Seçilen form başlığı */}
                </View>
                <View style={styles.modalBottom}>
                  {/* İşte alt bölüm */}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      handleFormIdClick(item);
                    }}>
                    <Image
                      source={require('../assets/product-form-builder-magnifying-glass-filled.png')}
                    />
                    <Text style={styles.modalButtonText}>Results</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Fill Out" button click
                      // navigation.navigate('FillOut'); // Burada Fill Out sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image
                      source={require('../assets/product-form-builder-filled.png')}
                    />
                    <Text style={styles.modalButtonText}>Fill Out</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Edit" button click
                      // navigation.navigate('Edit'); // Burada Edit sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image
                      source={require('../assets/pencil-line-filled.png')}
                    />
                    <Text style={styles.modalButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Assign" button click
                      // navigation.navigate('Assign'); // Burada Assign sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image source={require('../assets/users-filled.png')} />
                    <Text style={styles.modalButtonText}>Assign</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Assign" button click
                      // navigation.navigate('Assign'); // Burada Assign sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image source={require('../assets/desktop-filled.png')} />
                    <Text style={styles.modalButtonText}>Kiosk Mode</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Assign" button click
                      // navigation.navigate('Assign'); // Burada Assign sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image source={require('../assets/arrow-flip-right.png')} />
                    <Text style={styles.modalButtonText}>Publish</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Assign" button click
                      // navigation.navigate('Assign'); // Burada Assign sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image source={require('../assets/pause-filled.png')} />
                    <Text style={styles.modalButtonText}>Disable</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // Handle "Assign" button click
                      // navigation.navigate('Assign'); // Burada Assign sayfasına yönlendirme yapabilirsiniz.
                    }}>
                    <Image source={require('../assets/trash-filled.png')} />
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  title="Close Modal"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </Modal>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
  titleText: {
    color: '#030D50',
    fontSize: 18,
    fontFamily: 'Circular',
    fontWeight: '700',
    lineHeight: 19.94,
  },
  subtitleText: {
    color: '#6C73AB',
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: '400',
    lineHeight: 15.51,
    wordWrap: 'break-word',
  },
  modalContent: {
    backgroundColor: '#030D50',
    padding: 20,
    borderRadius: 30,
    flex: 0.4,
  },
  modalTop: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  modalTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Circular',
    fontWeight: '400',
    lineHeight: 17.73,
  },
  modalBottom: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  modalButton: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '300',
    lineHeight: 15.51,
    flexDirection: 'row',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
