import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import PieDataChart from '../charts/PieDataChart';
import DonutDataChart from '../charts/DonutDataChart';
import BarDataChart from '../charts/BarDataChart';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalBarDataChart from '../charts/HorizontalBarDataChart';
import TextDataChart from '../charts/TextDataChart';
import DateTimePicker from '@react-native-community/datetimepicker';

const Submissions = ({selectedForm}) => {
  const appKey = useSelector(state => state.appKey);
  const API_URL = `https://api.jotform.com/form/${selectedForm?.id}/questions?apiKey=${appKey}`;
  const [selectedOption, setSelectedOption] = useState('Select a question');
  const [selectedQuestionQid, setSelectedQuestionQid] = useState('');
  const [selectedChartData, setSelectedChartData] = useState(null); // State for selected chart type
  const [questions, setQuestions] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);

  // DATE PICKER PART
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayText, setDisplayText] = useState('All time');
  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);

    if (selected) {
      const formattedDate = selected.toLocaleDateString('en-US');
      setDisplayText(formattedDate);
      setSelectedDate(selected);
    } else {
      setDisplayText('All Time');
      setSelectedDate(null);
    }
  };

  console.log(selectedForm?.id);

  // CALCULATE ANSWERS
  const validResponsesCount = totalSubmissions - undefinedCount;
  const totalSubmissions = submissionData.length;
  const undefinedCount = submissionData.filter(
    data => data.answer === undefined,
  ).length;
  const calculateAnswerCounts = () => {
    const answerCounts = {};

    submissionData.forEach(data => {
      const answer = data.answer;
      if (answerCounts[answer]) {
        answerCounts[answer]++;
      } else {
        answerCounts[answer] = 1;
      }
    });

    return Object.entries(answerCounts);
  };

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

  useEffect(() => {
    if (selectedQuestionQid) {
      const submissionAPIURL = `https://api.jotform.com/form/${selectedForm.id}/submissions?apiKey=${appKey}`;
      axios
        .get(submissionAPIURL)
        .then(response => {
          const {content} = response.data;
          const submissionData = [];

          content.forEach(submission => {
            Object.entries(submission.answers).forEach(([key, answer]) => {
              if (selectedQuestionQid === key) {
                submissionData.push({
                  createdAt: submission.created_at,
                  answer: answer.answer,
                });
              }
            });
          });

          setSubmissionData(submissionData);
        })
        .catch(error => {
          console.error('API isteği sırasında hata oluştu:', error);
        });
    }
  }, [selectedQuestionQid]);

  return (
    <ScrollView style={{marginTop: 50}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={{fontSize: 16, color: 'blue', marginRight: 10}}>
            {displayText}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Dropdown
          options={questions
            .filter(question =>
              [
                'control_rating',
                'control_scale',
                'control_dropdown',
                'control_radio',
              ].includes(question.type),
            )
            .map(question => question.text)}
          selectedOption={selectedOption}
          onSelect={selectedText => {
            const selectedQuestion = questions.find(
              question => question.text === selectedText,
            );
            setSelectedQuestionQid(selectedQuestion.qid);
            setSelectedOption(selectedText);
          }}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{marginTop: 25}}>
          {validResponsesCount} out of {totalSubmissions} people answered
        </Text>
        {/* Dropdown to select the chart type */}
        <Dropdown
          options={[
            'Pie Chart',
            'Donut Chart',
            'Bar Chart',
            'Horizontal Bar Chart',
            'Text Chart',
          ]}
          selectedOption={
            selectedChartData
              ? selectedChartData.charAt(0).toUpperCase() +
                selectedChartData.slice(1) +
                ' Chart'
              : 'Select a chart'
          }
          onSelect={selectedChart => {
            if (selectedChart.toLowerCase() === 'text') {
              setSelectedChartData('text');
            } else {
              setSelectedChartData(selectedChart.toLowerCase().split(' ')[0]);
            }
          }}
        />
      </View>

      {selectedChartData === 'pie' && (
        <PieDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'donut' && (
        <DonutDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'bar' && (
        <BarDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'horizontalBar' && (
        <HorizontalBarDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'text' &&
        calculateAnswerCounts().map(([answer, count], index) => (
          <TextDataChart key={index} answer={answer} count={count} />
        ))}
    </ScrollView>
  );
};

export default Submissions;
