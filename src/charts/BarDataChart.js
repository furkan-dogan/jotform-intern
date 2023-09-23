import React from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const BarDataChart = ({submissionData}) => {
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
      label: answer,
    }),
  );

  return (
    <View>
      <BarChart
        barWidth={50}
        textSize={30}
        textBackgroundRadius={26}
        data={barData}
        barBorderRadius={3}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

export default BarDataChart;
