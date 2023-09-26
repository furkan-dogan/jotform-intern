import React from 'react';
import {View, Text} from 'react-native';

const TextDataChart = ({answer, count}) => {
  return (
    <View style={{marginTop: 25}}>
      <Text>
        Cevap:{' '}
        {answer !== 'undefined'
          ? JSON.stringify(answer)
          : 'Kullanıcı cevap vermedi'}
      </Text>
      <Text>Bu cevabı veren kişi sayısı: {count}</Text>
    </View>
  );
};

export default TextDataChart;
