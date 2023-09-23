import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import PieDataChart from '../charts/PieDataChart';
import DonutDataChart from '../charts/DonutDataChart';
import BarDataChart from '../charts/BarDataChart';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalBarDataChart from '../charts/HorizontalBarDataChart';

const Submissions = ({route}) => {
  const {selectedForm} = route.params ?? {};
  const appKey = useSelector(state => state.appKey);
  const API_URL = `https://api.jotform.com/form/${selectedForm.id}/questions?apiKey=${appKey}`;
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [selectedQuestionQid, setSelectedQuestionQid] = useState('');
  const [questions, setQuestions] = useState([]);
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
    <ScrollView style={{marginTop: 40}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Form Detayları
      </Text>
      <Text>Selected Option: {selectedOption}</Text>
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
          // Seçilen selectedOption'u questions dizisinden bulup, qid ve text'i günceller
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

      <Text>"form_id": {selectedForm.id}</Text>

      <Text>"created_at": {selectedForm.created_at}</Text>

      {submissionData.map((data, index) => (
        <View key={index}>
          <Text> </Text>

          <Text>Submission {index + 1}</Text>
          <Text>created_at: {data.createdAt}</Text>
          <Text>Form Yanıtlama Tarihi</Text>
          <Text>answer: {JSON.stringify(data.answer)}</Text>
        </View>
      ))}

      <PieDataChart submissionData={submissionData} />
      <DonutDataChart submissionData={submissionData} />
      <BarDataChart submissionData={submissionData} />
      <HorizontalBarDataChart submissionData={submissionData} />

      {calculateAnswerCounts().map(([answer, count], index) => (
        <View key={index} style={{marginTop: 25}}>
          <Text>Cevap: {answer}</Text>
          <Text>Bu cevabı veren kişi sayısı: {count}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Submissions;
