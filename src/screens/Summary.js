import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import SummaryItem from '../components/SummaryItem';

const Summary = ({selectedForm, navigationState}) => {
  const appKey = useSelector(state => state.appKey);
  const API_URL = `https://api.jotform.com/form/${selectedForm?.id}/questions?apiKey=${appKey}`;

  const [selectedChartData, setSelectedChartData] = useState(null); // State for selected chart type
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();

  // CALCULATE ANSWERS
  // const validResponsesCount = totalSubmissions - undefinedCount;
  // const totalSubmissions = submissionData.length;
  // const undefinedCount = submissionData.filter(
  //   data => data.answer === undefined,
  // ).length;

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => {
        const {content} = response.data;
        setQuestions(Object.values(content));
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }, []);

  return (
    <ScrollView style={{marginTop: 30}}>
      <View>
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
      </View>

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
