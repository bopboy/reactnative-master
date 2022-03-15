import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image, ImageStore } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-asset';

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font))
const loadImages = (images) => images.map(image => {
  if (typeof image === "string") return Image.prefetch(image)
  else return Asset.loadAsync(image)
})
export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font])
    const images = loadImages([
      require('./screenshot.png'),
      "https://bopboy.github.io/assets/img/me.png"
    ])
    await Promise.all([...fonts, ...images])
    // console.log(images)
    // await Asset.loadAsync(require('./screenshot.png'))
    // await Image.prefetch("https://bopboy.github.io/assets/img/me.png")
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
