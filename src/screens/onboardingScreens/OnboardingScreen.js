import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import OnboardingPage from '../onboardingScreens/OnboardingPage';

const pages = [
  {
    title: 'Sayfa 1 Başlık',
    description: 'Sayfa 1 Açıklama',
  },
  {
    title: 'Sayfa 2 Başlık',
    description: 'Sayfa 2 Açıklama',
  },
  {
    title: 'Sayfa 3 Başlık',
    description: 'Sayfa 3 Açıklama',
  },
  {
    title: 'Sayfa 4 Başlık',
    description: 'Sayfa 4 Açıklama',
  },
];

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      pages={pages.map((page, index) => (
        <OnboardingPage
          key={index}
          title={page.title}
          description={page.description}>
          {' '}
        </OnboardingPage>
      ))}
      onDone={() => {
        // Onboarding tamamlandığında yapılacak işlemler
        navigation.navigate('StartScreen'); // Ana ekranı açmak için uygun komutu kullanın
      }}
    />
  );
};

export default OnboardingScreen;
