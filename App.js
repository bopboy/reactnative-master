import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image, ImageStore } from 'react-native';
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset';

export default function App() {
  const [assets] = useAssets([require("./screenshot.png")])
  const [loaded] = Font.useFonts(Ionicons.font)
  if (!assets || !loaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <Text>We are done loading!</Text>
  );
}
