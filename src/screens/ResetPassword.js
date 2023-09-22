import React, {useState} from 'react';
import {Button} from 'react-native';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ResetPassword({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});

  return (
    <SafeAreaView>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        title="Send Instructions"
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{marginTop: 16}}></Button>
    </SafeAreaView>
  );
}
