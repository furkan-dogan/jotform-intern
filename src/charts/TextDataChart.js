import React from 'react';
import {View, Text} from 'react-native';

const TextDataChart = ({answer, count}) => {
  const data = [
    {
      label: 'Answer:',
      value: answer !== 'undefined' ? answer : 'No Answer',
    },
    {label: 'Submissions:', value: count},
  ];

  return (
    <View style={{marginLeft: 20, borderWidth: 1}}>
      <View style={{flexDirection: 'row'}}>
        {data.map((item, index) => (
          <View key={index} style={{flex: 1, alignItems: 'center'}}>
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={{height: 20}}></View>
    </View>
  );
};

export default TextDataChart;
