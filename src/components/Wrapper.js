import {View, Text} from 'react-native';
import React from 'react';

const Wrapper = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

export default Wrapper;
