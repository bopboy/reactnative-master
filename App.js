import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-asset';

export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font)
    await Asset.loadAsync(require('./screenshot.png'))
    await Image.prefetch("https://bopboy.github.io/assets/img/me.png")
  }
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    )
  }
  return (
    <Text>We are done loading!</Text>
  );
}
