import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Separator = () => <View style={styles.separator} />;

const CreateSummaryReport = ({route}) => {
  const {selectedForm} = route.params ?? {};

  return (
    <Wrapper>
      <View>
        <View>
          <Text
            style={{
              color: '#030D50',
              fontSize: 16,
              fontFamily: 'Circular',
              fontWeight: '400',
            }}>
            Form adı: {selectedForm?.title}
          </Text>
          <Text
            style={{
              color: '#C8CEED',
              fontSize: 12,
              fontFamily: 'Circular',
              fontWeight: '400',
              lineHeight: 13.3,
            }}>
            Responses:{' '}
          </Text>
        </View>

        <Separator />

        <View
          style={{
            borderWidth: 1,
            height: 100,
            width: 359,
            borderColor: '#C8CEED',
            borderRadius: 8,
            marginTop: 33,
          }}>
          <Text
            style={{
              color: '#030D50',
              fontSize: 16,
              marginTop: 16,
              marginLeft: 19,
            }}>
            Invitation Link
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                padding: 14,
              }}>
              <Image
                style={{width: 20, height: 20, alignContent: 'flex-end'}}
                source={require('../assets/clarity_link-line.png')}
              />
              <Text style={styles.TextInput}>
                https://www.jotform.com/report/23654789865234
              </Text>
              <TouchableOpacity style={styles.ButtonInput}>
                <Text style={styles.ButtonText}>Copy Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            height: 246,
            width: 359,
            flexDirection: 'row',
            borderColor: '#C8CEED',
            borderRadius: 8,
            marginTop: 30,
          }}>
          <View>
            <Text
              style={{
                color: '#030D50',
                fontSize: 16,
                marginTop: 16,
                marginLeft: 19,
                marginBottom: 10,
              }}>
              Invite By Email
            </Text>
            <Text
              style={{
                color: '#6C73AB',
                fontSize: 9,
                fontFamily: 'Circular',
                fontWeight: '400',
                lineHeight: 9.97,
                marginLeft: 19,
                marginRight: 24,
                marginBottom: 10,
              }}>
              You can share form responses via e-mail addresses you specify.
            </Text>
            <View>
              <TextInput
                style={{
                  marginLeft: 15,
                  borderWidth: 0.5,
                  borderColor: 'grey',
                  borderRadius: 5,
                  marginBottom: 20,
                }}
                placeholder="  Email"></TextInput>
              <TextInput
                style={{
                  marginLeft: 15,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  borderColor: 'grey',
                  height: 68,
                  marginBottom: 14,
                }}
                placeholder="  Add an informational message (optional)"></TextInput>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity style={styles.ButtonInput}>
                <Text style={styles.ButtonText}>Send Invitation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            height: 55,
            width: 359,
            flexDirection: 'row',
            borderColor: '#C8CEED',
            borderRadius: 8,
            marginTop: 33,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#030D50',
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 16,
                marginLeft: 19,
              }}>
              Download PDF
            </Text>

            <View
              style={{
                justifyContent: 'center',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity style={styles.ButtonInput}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 4,
                  }}
                  source={require('../assets/arrow-up-to-line.png')}
                />
                <Text style={styles.ButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default CreateSummaryReport;

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#C8CEED',
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  TextInput: {
    backgroundColor: '#DADEF3',
    borderWidth: 1,
    borderColor: '#F3F3FE',
    borderRadius: 5,
    width: 276,
    height: 31,
    marginLeft: 19,
    marginBottom: 19,
  },
  ButtonInput: {
    backgroundColor: '#64B220',
    borderRadius: 4,
    flexDirection: 'row',
    height: 32,
    width: 100,
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Circular',
    fontWeight: 'bold',
    lineHeight: 16,
  },
});
