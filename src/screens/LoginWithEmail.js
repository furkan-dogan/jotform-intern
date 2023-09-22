import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function LoginWithEmail() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appKey, setAppKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAppKey, setShowAppKey] = useState(false); // Yeni eklenen durum

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

      if (response?.data?.content?.appKey) {
        const userAppKey = response.data.content.appKey;

        dispatch({type: 'SET_APP_KEY', payload: userAppKey});

        setAppKey(userAppKey);
        setShowAppKey(true);
        setTimeout(() => {
          setShowAppKey(false);
          navigation.navigate('Forms');
        }, 2000); // 2 saniye bekleyin ve sonra yönlendirme yapın
      } else {
        setErrorMessage(
          'Böyle bir kullanıcı yok veya kullanıcı adı/şifre yanlış',
        );
      }
    } catch (error) {
      console.error('Hata:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 123,
          display: 'inline-flex',
        }}>
        <BackButton goBack={navigation.goBack} />
        <Text
          style={{
            alignSelf: 'center',
            color: '#030D50',
            fontSize: 20,
            fontFamily: 'Circular',
            fontWeight: '700',
            letterSpacing: 0.4,
            marginBottom: 50,
          }}>
          Sign In
        </Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            gap: 16,
            display: 'inline-flex',
          }}>
          <TouchableOpacity style={{backgroundColor: 'transparent'}}>
            <View style={styles.frame}>
              <Image
                source={require('../assets/flat-color-icons_google.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.frame}>
              <Image source={require('../assets/logos_facebook.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.frame}>
              <Image source={require('../assets/logos_microsoft-icon.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.frame}>
              <Image source={require('../assets/logos_salesforce.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
          marginVertical: 25,
        }}>
        <View style={{flex: 1, height: 1, backgroundColor: '#C8CEED'}} />
        <Text
          style={{
            color: '#C8CEED',
            fontSize: 12,
            fontFamily: 'Circular',
            fontWeight: '400',
            letterSpacing: 0.4,
          }}>
          OR
        </Text>
        <View style={{flex: 1, height: 1, backgroundColor: '#C8CEED'}} />
      </View>

      <View style={styles.viewLogin}>
        <View style={styles.viewText}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.viewText}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
          }}>
          <Text
            style={{
              position: 'absolute',
              top: 0, // İstediğiniz dikey konumu belirleyin
              right: 20, // Ekranın en sağına yerleştirmek için sağa 0 verin
              color: '#6C73AB',
              fontSize: 14,
              fontFamily: 'Circular',
              fontWeight: '400',
              letterSpacing: 0.4,
            }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInView}>
        <Button
          style={styles.signInButton}
          mode="contained"
          onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </Button>
      </View>

      {showAppKey && <Text style={{marginTop: 10}}>appKey: {appKey}</Text>}
      {errorMessage && (
        <Text style={{color: 'red', marginTop: 10}}>{errorMessage}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signInView: {
    marginTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'center',
    display: 'flex',
  },
  signInButton: {
    addingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#64B220',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
  },

  signInText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Circular',
    fontWeight: '500',
    lineHeight: 16,
    wordWrap: 'break-word',
  },
  frame: {
    borderWidth: 2,
    borderColor: '#E3E5F5',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#030D50',
    paddingLeft: 18,
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  TextInput: {
    borderWidth: 2,
    borderColor: '#E3E5F5',
    borderRadius: 4,
    border: '1px #E3E5F5 solid',
    width: 360,
    height: '50%',
    marginLeft: 16,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  viewLogin: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 16,
    display: 'inline-flex',
  },
  viewText: {
    height: 74,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    display: 'flex',
  },
});
