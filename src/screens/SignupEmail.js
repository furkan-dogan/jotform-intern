import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {Icon} from '@rneui/themed';

export default function SignupEmail({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

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
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {' '}
            <Icon name="google" />
            Button 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 4</Text>
        </TouchableOpacity>
      </View>
      <Text>veya</Text>
      <Header>Veri toplamaya başlamak için kaydolun.</Header>
      <TextInput
        label="Kullanıcı Adı veya E-posta"
        returnKeyType="next"
        onChangeText={text => setEmail({value: text, error: ''})}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Şifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Parolamı unuttum</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="E-posta ile giriş yap"
        mode="contained"
        onPress={() => navigation.navigate('HomePage')}></Button>
      <View style={styles.row}>
        <Text>Hesabınız yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}> Kaydol</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Butonları yatay olarak sıralar
    justifyContent: 'space-between', // Boşlukları eşit olarak dağıtır
    paddingHorizontal: 20, // Butonlar arasına yatay boşluk ekler
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '23%', // Butonların eşit genişlikte olmasını sağlar
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
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
});
