import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import SummaryItem from '../components/SummaryItem';
import ViewShot from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';

const Summary = ({selectedForm, navigationState}) => {
  const appKey = useSelector(state => state.appKey);
  const API_URL = `https://api.jotform.com/form/${selectedForm?.id}/questions?apiKey=${appKey}`;
  const [questions, setQuestions] = useState([]);
  const [uri, setUri] = useState();
  const [isSubmissionRequested, setSubmissionRequested] = useState();
  const navigation = useNavigation();

  const getSubmissions = () => {
    if (isSubmissionRequested) {
      return;
    }
    setSubmissionRequested(true);
    console.log('requested');
    axios
      .get(API_URL)
      .then(response => {
        console.log('received');
        const {content} = response.data;
        setQuestions(Object.values(content));
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      })
      .finally(() => {
        setSubmissionRequested(false);
      });
  };

  const runSubmissionListener = () => {
    getSubmissions();
    const interval = setInterval(() => {
      getSubmissions();
    }, 10000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    return runSubmissionListener();
  }, []);

  const viewShotRef = useRef();

  const handleCreateSummaryButtonClick = async () => {
    const summaryScreenshotUri = await viewShotRef.current.capture();
    navigationState.navigate('CreateSummaryReport', {
      selectedForm,
      summaryScreenshotUri,
    });
    console.log(uri);
  };

  return !questions.length ? null : (
    <ScrollView style={{marginTop: 30}}>
      <View>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
          {questions
            .filter(question =>
              [
                'control_rating',
                'control_scale',
                'control_dropdown',
                'control_radio',
              ].includes(question.type),
            )
            .map((question, index) => (
              <SummaryItem
                question={question}
                key={index}
                selectedForm={selectedForm}></SummaryItem>
            ))}
        </ViewShot>
      </View>

      {/* onPress={handleCreateSummaryButtonClick} */}
      <TouchableOpacity
        onPress={() =>
          navigationState.navigate('CreateSummaryReport', {selectedForm})
        }>
        <View
          style={{
            backgroundColor: '#344067',
            borderRadius: 4,
            paddingLeft: 12,
            paddingRight: 12,
          }}>
          <View
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontFamily: 'Circular',
                fontWeight: '500',
                lineHeight: 18,
              }}>
              Create Summary Report
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Summary;
