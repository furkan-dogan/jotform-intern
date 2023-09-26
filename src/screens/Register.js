import React, {useState} from 'react';
import {StyleSheet, Button} from 'react-native';
import Logo from '../components/Logo';
import HeaderForms from '../components/HeaderForms';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {blue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Register({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
  };

  return (
    <SafeAreaView>
      <Logo />
      <HeaderForms>Ücretsiz hesap oluştur</HeaderForms>
      <TextInput
        label="İsim Soyisim"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="E-posta"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
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
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        title="Kayıt ol"
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: blue,
  },
});
