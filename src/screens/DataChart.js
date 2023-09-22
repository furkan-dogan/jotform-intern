import React from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

const DataChart = ({submissionData}) => {
  const colors = ['#177AD5', '#FF6100', '#FFD700', '#32CD32', '#8A2BE2'];

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
        textSize={20}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
    </View>
  );
};

export default DataChart;
