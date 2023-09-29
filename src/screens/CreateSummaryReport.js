import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Separator = () => <View style={styles.separator} />;

const CreateSummaryReport = ({route}) => {
  const {selectedForm, summaryScreenshotUri} = route.params ?? {};
  const handleDownloadButtonClick = async () => {
    try {
      // Create a PDF document configuration
      const pdfOptions = {
        html: `
    <html>
      <head>
        <style>
          Jotform DataChart Downloader
        </style>
      </head>
      <body>
        <h1>Özel PDF</h1>
        <p>...</p>
        <img src="${summaryScreenshotUri}" />
      </body>
    </html>
  `,
        fileName: 'summary',
        directory: 'Documents',
      };

      // Generate the PDF document
      const pdf = await RNHTMLtoPDF.convert(pdfOptions);

      // Get the path to the generated PDF
      const pdfPath = pdf.filePath;

      // Now you can do something with the PDF path, like opening or sharing it
      console.log('PDF saved to:', pdfPath);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            Form name: {selectedForm?.title}
          </Text>
        </View>

        <Separator />

        <View
          style={{
            borderWidth: 1,
            height: 100,
            width: 359,
            borderColor: '#C8CEED',
            borderRadius: 10,
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
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text
                style={{
                  backgroundColor: '#DADEF3',
                  borderWidth: 1,
                  borderColor: '#F3F3FE',
                  borderRadius: 5,
                  width: 276,
                  height: 32,
                  fontSize: 10,
                  marginLeft: 19,
                  paddingTop: 8,
                  paddingLeft: 9,
                  marginBottom: 19,
                }}>
                https://www.jotform.com/report/232702029212039
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#64B220',
                  borderRadius: 4,
                  flexDirection: 'row',
                  height: 32,
                  width: 80,
                  paddingLeft: 4,
                  paddingRight: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}>
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
            </View>
            <View style={{marginLeft: 19, marginRight: 24, marginBottom: 10}}>
              <Text
                style={{
                  color: '#6C73AB',
                  fontSize: 9.5,
                }}>
                You can share form responses via e-mail addresses you specify.
              </Text>
            </View>
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#64B220',
                  borderRadius: 4,
                  flexDirection: 'row',
                  height: 32,
                  width: 130,
                  paddingLeft: 4,
                  paddingRight: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: 16,
                  }}>
                  Send Invitation
                </Text>
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
                alignContent: 'flex-start',
                marginLeft: 100,
              }}>
              <TouchableOpacity
                style={styles.ButtonInput}
                onPress={handleDownloadButtonClick}>
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
    fontWeight: 'bold',
    lineHeight: 16,
  },
});
