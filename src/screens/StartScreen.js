import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, Button, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import axios from 'axios';

export default function StartScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  useEffect(() => {
    const apiUrl =
      'https://api.jotform.com/user/forms?apikey=2eacf50a8d83d73bb9bba97a6f76b6e4'; // İstek atacağınız API'nin URL'si

    // GET isteği gönderme
    axios
      .get(apiUrl)
      .then(function (response) {
        // İstek başarılı olduğunda burası çalışır
        console.log('Başarılı istek:', response.data);
      })
      .catch(function (error) {
        // İstek başarısız olduğunda burası çalışır
        console.error('Hata:', error);
      });
  }, []);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'HomePage'}],
    });
  };

  return (
    <Background>
      <Logo />
      <Header>Veri toplamaya başlamak için kaydolun.</Header>
      <View style={styles.viewButtons}>
        <Button title="Google ile kaydol" mode="contained"></Button>
        <Button title="Facebook ile kaydol" mode="contained"></Button>
      </View>

      <Text>veya</Text>

      <Button
        title="E-posta ile kaydol"
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}></Button>
      <View style={styles.row}>
        <Text>Hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => navigation.replace('SignupEmail')}>
          <Text style={styles.link}> Giriş yapın</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: '#414757',
  },
  link: {
    fontWeight: 'bold',
    color: '#560CCE',
  },
  viewButtons: {
    marginTop: 90,
  },
});
