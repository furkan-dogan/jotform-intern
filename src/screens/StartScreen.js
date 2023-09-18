import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StartScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
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
      <View style={{padding: 16}}>
        <Button mode="outlined" onPress={() => navigation.navigate('')}>
          <Icon name="google" size={20} color="black" />
          Google ile kaydol
        </Button>
      </View>

      <View style={{padding: 16}}>
        <Button mode="outlined" onPress={() => navigation.navigate('')}>
          <Icon name="google" size={20} color="black" />
          Facebook ile kaydol
        </Button>
      </View>

      <Text>veya</Text>

      <Button mode="contained" onPress={() => navigation.navigate('Register')}>
        E-posta ile kaydol
      </Button>
      <View style={styles.row}>
        <Text>Hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginWithEmail')}>
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
