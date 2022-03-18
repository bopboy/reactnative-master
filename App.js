import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient(queryClient)

export default function App() {
  const [assets] = useAssets([require("./screenshot.png")])
  const [loaded] = Font.useFonts(Ionicons.font)
  const isDark = useColorScheme() === "dark"
  if (!assets || !loaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
