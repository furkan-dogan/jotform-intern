import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {setAppKey} from '../redux/actions';

export default function LoginWithEmail() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appKey, setAppKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('appName', 'iOS');
      formData.append('access', 'full');

      const response = await axios({
        method: 'post',
        url: 'https://api.jotform.com/user/login',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      //if (response.data && response.data.content.appKey) {
      if (response?.data?.content?.appKey) {
        //setAppKey(response.data.content.appKey);
        const userAppKey = response.data.content.appKey;
        dispatch({type: 'SET_APP_KEY', payload: userAppKey});
        navigation.navigate('FormSubmissions');
      } else {
        setErrorMessage(
          'Böyle bir kullanıcı yok veya kullanıcı adı/şifre yanlış',
        );
      }
    } catch (error) {
      console.error('Hata:', error);
      // Ağ hatası veya başka bir hata oluştuysa uygun mesajı ayarlayın
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View>
      <BackButton goBack={navigation.goBack} />

      <View style={{marginTop: 125}}>
        <Text>Kullanıcı Girişi</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
        />
        <Text>Şifre</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Giriş Yap" onPress={handleLogin} />
        {appKey && <Text style={{marginTop: 10}}>appKey: {appKey}</Text>}
        {errorMessage && (
          <Text style={{color: 'red', marginTop: 10}}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
}
