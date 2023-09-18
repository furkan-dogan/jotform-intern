import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://api.jotform.com/user/forms?apiKey=';

const Forms = ({}) => {
  const [forms, setForms] = useState([]);
  const appKey = useSelector(state => state.appKey);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${API_URL}${appKey}`)
      .then(response => {
        console.log(response.data);
        const {content} = response.data;
        setForms(content);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }, [appKey]);

  const handleFormIdClick = selectedForm => {
    // Seçilen veriyi submissions.js sayfasına yönlendirdik
    navigation.navigate('Submissions', {selectedForm});
  };

  return (
    <View style={{marginTop: 40}}>
      <FlatList
        data={forms}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleFormIdClick(item)}>
            <View>
              <Text>"form_id": {item.id}</Text>
              <View style={{marginBottom: 10}}></View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Forms;
