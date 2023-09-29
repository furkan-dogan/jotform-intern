import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const PieDataChart = ({submissionData}) => {
  const colors = [
    '#C3C8CB',
    '#4DBEFC',
    '#419ED1',
    '#0066C3',
    '#0075E3',
    '#0A1551',
  ];

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

    return answerCounts;
  };

  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View
          style={{
            height: 18,
            width: 18,
            borderRadius: 4,
            backgroundColor: color || 'black',
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            marginRight: 10,
            marginLeft: 5,
          }}>
          {text || ''}
        </Text>
      </View>
    );
  };

  const answerCounts = calculateAnswerCounts();

  const totalAnswers = submissionData.length;

  const pieData = Object.entries(answerCounts).map(
    ([answer, count], index) => ({
      value: (count / totalAnswers) * 100,
      text: `${Math.round((count / totalAnswers) * 100)}%`,
      color: colors[index % colors.length],
      label: answer === 'undefined' ? 'No Answer' : answer,
    }),
  );

  const legendComponents = pieData.map((data, index) => (
    <View key={index}>{renderLegend(data.label, data.color)}</View>
  ));

  return (
    <View style={{marginLeft: 15, marginTop: 10}}>
      <PieChart
        showText
        textColor="black"
        radius={140}
        textSize={16}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
      <View style={{flexDirection: 'column', marginLeft: 20}}>
        {legendComponents}
      </View>
      <Text> </Text>
    </View>
  );
};

export default PieDataChart;
