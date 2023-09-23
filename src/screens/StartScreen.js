import React from 'react';
import {TouchableOpacity, StyleSheet, View, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import {Text} from 'react-native-paper';
import Logo from '../components/Logo';

export default function StartScreen({navigation}) {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'white',
        borderRadius: 40,
        overflow: 'hidden',
      }}>
      <Logo />
      <Text style={styles.header}>Sign up to start collecting data.</Text>
      <View style={styles.signupView}>
        <Button
          style={styles.signupGoogleButton}
          mode="outlined"
          onPress={() => navigation.navigate('')}>
          <Text style={styles.signupText}>Sign up with Google</Text>
        </Button>
      </View>

      <View style={styles.signupView}>
        <Button
          style={styles.signupFacebookButton}
          mode="outlined"
          onPress={() => navigation.navigate('DataChart')}>
          <Text style={styles.signupText}>Sign up with Facebook</Text>
        </Button>
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

      <View style={styles.signupView}>
        <Button
          style={styles.signupEmailButton}
          mode="contained"
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}>Sign up with Email</Text>
        </Button>
      </View>

      <View style={styles.row}>
        <Text>Already have an account</Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginWithEmail')}>
          <Text style={styles.link}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Circular',
    fontWeight: '400',
    alignSelf: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
  },
  forgot: {
    fontSize: 13,
    color: '#414757',
  },
  link: {
    color: '#4DBEFC',
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: '400',
    letterSpacing: 0.4,
  },
  signupFacebookButton: {
    addingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#0066C3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
  },
  signupGoogleButton: {
    addingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#0075E3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
  },
  signupEmailButton: {
    addingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FF6100',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
  },
  signupText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Circular',
    fontWeight: '500',
    lineHeight: 16,
  },
  signupView: {
    marginTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'center',
    display: 'flex',
  },
});
