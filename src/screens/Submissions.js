import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import QuestionDropdown from '../components/QuestionDropdown';
import ChartTypeDropdown from '../components/ChartTypeDropdown';
import PieDataChart from '../charts/PieDataChart';
import DonutDataChart from '../charts/DonutDataChart';
import BarDataChart from '../charts/BarDataChart';
import HorizontalBarDataChart from '../charts/HorizontalBarDataChart';
import TextDataChart from '../charts/TextDataChart';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Submissions = ({selectedForm}) => {
  const appKey = useSelector(state => state.appKey);
  const API_URL = `https://api.jotform.com/form/${selectedForm?.id}/questions?apiKey=${appKey}`;
  const [selectedOption, setSelectedOption] = useState('Select a question');
  const [selectedQuestionQid, setSelectedQuestionQid] = useState('');
  const [selectedChartData, setSelectedChartData] = useState(null); // State for selected chart type
  const [questions, setQuestions] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [isChartInfoVisible, setIsChartInfoVisible] = useState(false);

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

  // CALCULATE ANSWERS
  const totalSubmissions = submissionData.length;
  const undefinedCount = submissionData.filter(
    data => data.answer === undefined,
  ).length;
  const validResponsesCount = totalSubmissions - undefinedCount;

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
        const questions = Object.values(content).filter(question =>
          [
            'control_rating',
            'control_scale',
            'control_dropdown',
            'control_radio',
          ].includes(question.type),
        );
        setQuestions(questions);
        setSelectedQuestionQid(questions[0]?.qid);
        setSelectedOption(questions[0]?.text);
        setSelectedChartData('pie');
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

  const handleDownloadChart = async () => {
    try {
      // Capture the screen as an image
      const uri = await this.viewShotRef.capture();

      // Create a PDF document configuration
      const pdfOptions = {
        html: `<img src="${uri}" />`,
        fileName: 'chart',
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
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Text
              style={{
                color: '#030D50',
                fontSize: 14,
                fontFamily: 'Circular',
                fontWeight: '400',
                lineHeight: 15.51,
              }}>
              <Image
                style={{alignContent: 'flex-end'}}
                source={require('../assets/calendar-minus.png')}
              />
              {displayText}
              <TouchableOpacity
                onPress={() => {
                  if (showDatePicker) {
                    setShowDatePicker(false);
                  } else {
                    setShowDatePicker(true);
                  }
                }}>
                <Image
                  style={{alignContent: 'flex-end'}}
                  source={require('../assets/expand_down_light-2.png')}
                />
              </TouchableOpacity>
            </Text>
          </View>
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
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <QuestionDropdown //Sorular için dropdown
            options={questions.map(question => question.text)}
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
      </View>

      <View style={styles.chartViewStyle}>
        <View style={{flexDirection: 'row'}}>
          {isChartInfoVisible && (
            <Text
              style={{
                marginTop: 25,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              {validResponsesCount} out of {totalSubmissions} people answered
            </Text>
          )}
          <ChartTypeDropdown //Chart tipini seçmek için dropdown
            options={[
              'Pie Chart',
              'Donut Chart',
              'Bar Chart',
              'Horizontal Bar Chart',
              'Text Chart',
            ]}
            selectedOption={
              selectedChartData ? (
                selectedChartData.charAt(0).toUpperCase() +
                selectedChartData.slice(1) +
                ' Chart'
              ) : (
                <Image
                  //style={{alignContent: 'flex-end'}}
                  source={require('../assets/group_8761.png')}
                />
              )
            }
            onSelect={selectedChart => {
              if (selectedChart.toLowerCase() === 'text') {
                setSelectedChartData('text');
              } else {
                setSelectedChartData(selectedChart.toLowerCase().split(' ')[0]);
              }
              setIsChartInfoVisible(true);
            }}
          />
        </View>
        <ViewShot
          ref={ref => (this.viewShotRef = ref)} // Reference to the ViewShot component
          options={{format: 'jpg', quality: 0.9}}>
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
        </ViewShot>
      </View>

      <TouchableOpacity onPress={handleDownloadChart}>
        <View
          style={{
            backgroundColor: '#64B220',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 4,
            paddingLeft: 12,
            paddingRight: 12,
            padding: 8,
            marginTop: 30,
          }}>
          <View>
            <Image
              style={{
                position: 'relative',
              }}
              source={require('../assets/arrow-up-to-line.png')}
            />
          </View>
          <View
            style={{
              paddingLeft: 12,
              paddingRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
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
              Download Chart
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Submissions;

const styles = StyleSheet.create({
  chartViewStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C8CEED',
    height: 530,
    width: 310,
  },
});
