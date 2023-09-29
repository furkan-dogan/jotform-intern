import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import HeaderForms from '../components/HeaderForms';
import Wrapper from '../components/Wrapper';

const API_URL = 'https://api.jotform.com/user/forms?apiKey=';

const Forms = ({}) => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [selectedFormTitle, setSelectedFormTitle] = useState(''); // Form başlığını saklayacak state
  const [selectedForm, setSelectedForm] = useState({}); // Form başlığını saklayacak state

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

  const handleFormTitleClick = selectedForm => {
    setSelectedForm(selectedForm);
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

  const openWebView = () => {
    const url = 'https://www.jotform.com/form/232654601878059';

    Linking.openURL(url).catch(err => console.error('Linking error: ', err));
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        backdropColor="#030D50"
        position="bottom"
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={styles.modalContent}>
          <View style={styles.modalTop}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../assets/product-form-builder-color-border.png')}
              />
              <Text style={styles.modalTitle}>{selectedFormTitle}</Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image source={require('../assets/xmark.png')} />
                </TouchableOpacity>
              </View>
            </View>
            {/* Seçilen form başlığı */}
          </View>

          <View>
            {/* İşte alt bölüm */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('Results', {selectedForm: selectedForm});
                setTimeout(() => {
                  setModalVisible(false); // Modal'ı kapat (timeout sonrasında)
                }, 100);
                openModal();
              }}>
              <Image
                source={require('../assets/product-form-builder-magnifying-glass-filled.png')}
              />
              <Text style={styles.modalButtonText}>Results</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate('CreateSummaryReport');
                setTimeout(() => {
                  setModalVisible(false); // Modal'ı kapat (timeout sonrasında)
                }, 100);
                openModal();
              }}>
              <Image
                source={require('../assets/product-form-builder-filled.png')}
              />
              <Text style={styles.modalButtonText}>Fill Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                //navigation.navigate('CreateSummaryReport');
                setTimeout(() => {
                  setModalVisible(false); // Modal'ı kapat (timeout sonrasında)
                }, 100);
                openModal();
              }}>
              <Image source={require('../assets/pencil-line-filled.png')} />
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
        </View>
      </Modal>

      <HeaderForms onSearch={handleSearch} />
      <Wrapper>
        <FlatList
          data={filteredForms}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                handleFormTitleClick(item);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 30,
                }}>
                <View>
                  <Image
                    style={{width: 30}}
                    source={require('../assets/product-form-builder-color-border.png')}
                  />
                </View>

                <View style={{paddingLeft: 13, paddingRight: 13}}>
                  <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                  <View>
                    <Text style={styles.subtitleText}>
                      {item.count} Submissions
                    </Text>
                    <Text style={styles.subtitleText}>
                      Last submission: {item.updated_at}
                    </Text>
                  </View>
                </View>

                <View style={{paddingLeft: 10}}>
                  <Image
                    style={{width: 28}}
                    source={require('../assets/star-empty.png')}
                  />
                </View>
              </View>

              {/* Modal */}
            </TouchableOpacity>
          )}
        />
      </Wrapper>
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
    textAlign: 'left',
  },
  subtitleText: {
    textAlign: 'left',
    color: '#6C73AB',
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: '400',
    lineHeight: 15.51,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Circular',
    fontWeight: 'bold',
    lineHeight: 17.73,
    marginLeft: 6,
  },

  modalButton: {
    color: 'white',
    height: 32,
    background: '#F3F3F3',
    flexDirection: 'row',
  },
  modalButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
