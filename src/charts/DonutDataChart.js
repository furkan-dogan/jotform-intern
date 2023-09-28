import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const DonutDataChart = ({submissionData}) => {
  const colors = ['#0066C3', '#0075E3', '#4DBEFC', '#EDF8FF', '#FC0303'];

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
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'black',
          }}
        />
        <Text style={{color: 'black', fontSize: 16}}>{text || ''}</Text>
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

  const totalSubmissions = submissionData.length;
  const undefinedCount = submissionData.filter(
    data => data.answer === undefined,
  ).length;
  const validResponsesCount = totalSubmissions - undefinedCount;

  return (
    <View style={{marginLeft: 15, marginTop: 10}}>
      <PieChart
        donut
        showText
        textColor="black"
        radius={140}
        textSize={16}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
      <View style={{flexDirection: 'row'}}>{legendComponents}</View>
      <Text
        style={{
          marginTop: 25,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {validResponsesCount} out of {totalSubmissions} people answered
      </Text>
    </View>
  );
};

export default DonutDataChart;
