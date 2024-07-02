// screens/Page1.tsx
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function Page1() {
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    const text = 'Sign language translation applications are digital tools designed to translate text or speech in spoken language into sign language, and vice versa. The main purpose of this application is to facilitate communication between individuals who use sign language and those who use spoken language. Here is the general working mechanism of a sign language translation application.';
    setTranslatedText(text);
  };

  return (
    <View className='flex  justify-center p-10'>
      <Text className='text-justify mb-4 text-lg'>
        Aplikasi terjemahan Bahasa Isyarat adalah alat digital yang dirancang untuk menerjemahkan teks atau ucapan dalam bahasa lisan ke dalam Bahasa Isyarat, serta sebaliknya. Tujuan utama aplikasi ini adalah untuk memfasilitasi komunikasi antara individu yang menggunakan Bahasa Isyarat dan mereka yang menggunakan bahasa lisan. Berikut adalah cara kerja umum dari aplikasi terjemahan.
      </Text>
      <TouchableOpacity
        className='bg-blue-500 py-2 px-4 rounded-full'
        onPress={handleTranslate}
      >
        <Text  className='text-white text-center px-4 py-3 bg-blue-500 rounded-xl'>Translate to English</Text>
      </TouchableOpacity>
      {translatedText ? (
        <View className='mt-4 p-6 bg-white rounded-xl shadow-xl'>
          <Text className='text-justify text-lg text-black'>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
}
