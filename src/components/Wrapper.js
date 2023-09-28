import {View, Text} from 'react-native';
import React from 'react';

const Wrapper = ({children}) => {
  return <View style={{padding: 16}}>{children}</View>;
};

export default Wrapper;
