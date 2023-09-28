import {TouchableOpacity, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import QuestionDropdown from './QuestionDropdown';
import PieDataChart from '../charts/PieDataChart';
import DonutDataChart from '../charts/DonutDataChart';
import BarDataChart from '../charts/BarDataChart';
import HorizontalBarDataChart from '../charts/HorizontalBarDataChart';
import TextDataChart from '../charts/TextDataChart';
import axios from 'axios';
import {useSelector} from 'react-redux';

const SummaryItem = ({question, selectedForm}) => {
  const appKey = useSelector(state => state.appKey);
  const [selectedChartData, setSelectedChartData] = useState('pie');
  const [submissionData, setSubmissionData] = useState([]);

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
    const submissionAPIURL = `https://api.jotform.com/form/${selectedForm.id}/submissions?apiKey=${appKey}`;
    axios
      .get(submissionAPIURL)
      .then(response => {
        const {content} = response.data;
        const submissionData = [];
        content.forEach(submission => {
          Object.entries(submission.answers).forEach(([key, answer]) => {
            if (question.qid === key) {
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
  }, []);

  return (
    <View>
      <Text style={{marginHorizontal: 10, fontSize: 16}}>{question.text}</Text>
      <QuestionDropdown
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
      {selectedChartData === 'pie' && (
        <PieDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'donut' && (
        <DonutDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'bar' && (
        <BarDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'horizontal' && (
        <HorizontalBarDataChart submissionData={submissionData} />
      )}
      {selectedChartData === 'text' &&
        calculateAnswerCounts().map(([answer, count], index) => (
          <TextDataChart key={index} answer={answer} count={count} />
        ))}
    </View>
  );
};

export default SummaryItem;
