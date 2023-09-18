import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';

// Özelleştirilmiş dropdown component
const CustomDropdown = ({options, onSelect}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleOptionClick = option => {
    setSelectedValue(option);
    onSelect(option);
  };

  return (
    <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}>
      {options.map(option => (
        <TouchableOpacity
          key={option.text}
          onPress={() => handleOptionClick(option)}
          style={{padding: 10}}>
          <Text>{option.text}</Text>
        </TouchableOpacity>
      ))}
      {selectedValue && (
        <View style={{backgroundColor: '#eee', padding: 10}}>
          <Text>Selected Text: {selectedValue.text}</Text>
          <Text>Selected Answer: {selectedValue.answer}</Text>
        </View>
      )}
    </View>
  );
};

const Submissions = ({route}) => {
  const {selectedForm} = route.params ?? {};
  const appKey = useSelector(state => state.appKey);

  const API_URL = `https://api.jotform.com/form/${selectedForm.id}/submissions?apiKey=${appKey}`;

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => {
        console.log(response.data);
        const {content} = response.data;
        setSubmissions(content);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }, []);

  const getDropdownOptions = submission => {
    const dropdownAnswers = Object.values(submission.answers).filter(answer =>
      [
        'control_scale',
        'control_rating',
        'control_dropdown',
        'control_radio',
      ].includes(answer.type),
    );

    return dropdownAnswers.map(answer => ({
      text: answer.text,
      answer: answer.answer,
    }));
  };

  return (
    <View style={{marginTop: 40}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Form Detayları
      </Text>
      <Text>"form_id": {selectedForm.id}</Text>
      <Text>"created_at": {selectedForm.created_at}</Text>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
        Cevaplar
      </Text>
      <ScrollView style={{marginLeft: 20}}>
        {submissions.map(submission => (
          <View key={submission.id}>
            <Text> </Text>
            <Text>"Created At": {submission.created_at}</Text>
            <Text>"Submisson ID": {submission.id}</Text>
            {/* Veri türüne göre işlemleri yapın */}
            {Object.values(submission.answers).map(answer => {
              if (
                [
                  'control_scale',
                  'control_rating',
                  'control_dropdown',
                  'control_radio',
                ].includes(answer.type)
              ) {
                const dropdownOptions = getDropdownOptions(submission);
                return (
                  <CustomDropdown
                    key={answer.name}
                    options={dropdownOptions}
                    onSelect={selectedOption => {
                      setSelectedSubmission({
                        selectedText: selectedOption.text,
                        selectedAnswer: selectedOption.answer,
                      });
                    }}
                  />
                );
              }
              return null;
            })}
            {selectedSubmission && (
              <View>
                <Text>Selected Text: {selectedSubmission.selectedText}</Text>
                <Text>
                  Selected Answer: {selectedSubmission.selectedAnswer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Submissions;
