import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const HorizontalBarDataChart = ({submissionData}) => {
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

  const answerCounts = calculateAnswerCounts();

  const totalAnswers = submissionData.length;

  const barData = Object.entries(answerCounts).map(
    ([answer, count], index) => ({
      value: count,
      frontColor: colors[index % colors.length],
      label: answer === 'undefined' ? 'No Answer' : answer,
    }),
  );

  return (
    <View>
      <BarChart
        shiftX={30}
        horizontal
        barWidth={30}
        data={barData}
        barBorderRadius={3}
        yAxisThickness={0}
        xAxisThickness={0}
      />
      <Text> </Text>
    </View>
  );
};

export default HorizontalBarDataChart;
