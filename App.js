import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles';
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font)=>Font.loadAsync(Ionicons.font));
const loadImages = (images) => 
  images.map((image)=>{
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image)
    }
  })

export default function App() {
  const isDark = useColorScheme() === "dark";
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    async function prepare() {
      try {
        await Promise.all([...loadFonts, ...loadImages]);
      } catch (error) {
        console.warn(error);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View onLayout={onLayoutRootView}/>

      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
            <RootNavigation/>
        </NavigationContainer>    
      </ThemeProvider>
    </QueryClientProvider>

  );
}
