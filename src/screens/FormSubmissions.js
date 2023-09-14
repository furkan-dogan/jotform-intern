import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const API_URL =
  'https://api.jotform.com/user/submissions?apiKey=2eacf50a8d83d73bb9bba97a6f76b6e4';
// furkando6an hesabı
const FormSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const appKey = useSelector(state => state.appKey);

  useEffect(() => {
    axios
      //.get(API_URL)
      .get(`${API_URL}&apiKey=${appKey}`)
      .then(response => {
        const {content} = response.data;
        setSubmissions(content);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }, []);

  return (
    <View style={{marginTop: 40}}>
      <FlatList
        data={submissions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>"id": {item.id}</Text>
            <Text>"form_id": {item.form_id}</Text>
            <Text>"created_at": {item.created_at}</Text>
            <Text>"status": {item.status}</Text>
            <Text>"updated_at": {item.updated_at}</Text>
            {Object.values(item.answers).map(answer => (
              <View key={answer.name}>
                <Text>"name": {answer.name}</Text>
                <Text>"order: {answer.order}</Text>
                <Text>"text": {answer.text}</Text>
                <Text>"type": {answer.type}</Text>
                <Text>-----</Text>
                {/* Soruya özgü diğer bilgileri burada ekrana yazdırabilirsiniz */}
              </View>
            ))}
            <View style={{marginBottom: 10}}></View>
          </View>
        )}
      />
    </View>
  );
};

export default FormSubmissions;
