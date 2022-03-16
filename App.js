import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/Tabs'
import Stack from './navigation/Stack';
import Root from './navigation/Root';

export default function App() {
  const [assets] = useAssets([require("./screenshot.png")])
  const [loaded] = Font.useFonts(Ionicons.font)
  if (!assets || !loaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
