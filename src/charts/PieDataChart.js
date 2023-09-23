import React from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const PieDataChart = ({submissionData}) => {
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

  const pieData = Object.entries(answerCounts).map(
    ([answer, count], index) => ({
      value: (count / totalAnswers) * 100,
      text: `${Math.round((count / totalAnswers) * 100)}%`,
      color: colors[index % colors.length],
    }),
  );

  return (
    <View>
      <PieChart
        showText
        textColor="black"
        radius={150}
        textSize={16}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
    </View>
  );
};

export default PieDataChart;
