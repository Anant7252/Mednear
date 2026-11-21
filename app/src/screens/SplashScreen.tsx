import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const useDriver = Platform.OS !== 'web';
const FULL_NAME = 'MedNear';

export const SplashScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  const iconScaleAnim = useRef(new Animated.Value(1.9)).current;
  const iconOpacityAnim = useRef(new Animated.Value(0)).current;

  const [typedLength, setTypedLength] = useState(0);

  const subtextOpacityAnim = useRef(new Animated.Value(0)).current;
  const subtextTranslateYAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    if (!isFocused) return;

    Animated.parallel([
      Animated.spring(iconScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 36,
        useNativeDriver: useDriver,
      }),
      Animated.timing(iconOpacityAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: useDriver,
      }),
    ]).start();

    let typingInterval: any = null;
    let subtextTimer: any = null;

    const startTypingTimer = setTimeout(() => {
      let currentLen = 0;
      typingInterval = setInterval(() => {
        currentLen += 1;
        setTypedLength(currentLen);
        if (currentLen >= FULL_NAME.length) {
          clearInterval(typingInterval);

          subtextTimer = setTimeout(() => {
            Animated.parallel([
              Animated.timing(subtextOpacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: useDriver,
              }),
              Animated.spring(subtextTranslateYAnim, {
                toValue: 0,
                friction: 6,
                tension: 40,
                useNativeDriver: useDriver,
              }),
            ]).start();
          }, 150);
        }
      }, 70);
    }, 550);

    const navTimer = setTimeout(() => {
      navigation.replace(user ? 'Home' : 'Welcome');
    }, 3200);

    return () => {
      clearTimeout(startTypingTimer);
      if (typingInterval) clearInterval(typingInterval);
      if (subtextTimer) clearTimeout(subtextTimer);
      clearTimeout(navTimer);
      iconScaleAnim.stopAnimation();
      iconOpacityAnim.stopAnimation();
      subtextOpacityAnim.stopAnimation();
      subtextTranslateYAnim.stopAnimation();
    };
  }, [user, isFocused]);

  const iconSize = width < 375 ? 130 : 148;
  const titleFontSize = width < 375 ? 44 : 50;

  const displayedText = FULL_NAME.slice(0, typedLength);
  const medPart = displayedText.slice(0, 3);
  const nearPart = displayedText.slice(3);

  return (
    <View className="flex-1 bg-white items-center justify-between py-16 px-6">
      <StatusBar style="dark" />

      <View className="w-full flex-1 items-center justify-center">
        <Animated.View
          style={{
            opacity: iconOpacityAnim,
            transform: [{ scale: iconScaleAnim }],
          }}
          className="items-center justify-center"
        >
          <View
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: Math.round(iconSize * 0.22),
              shadowColor: '#064e3b',
              shadowOffset: { width: 0, height: 16 },
              shadowOpacity: 0.18,
              shadowRadius: 24,
              elevation: 12,
            }}
            className="bg-white items-center justify-center"
          >
            <Image
              source={require('../../assets/app_icon_clean.png')}
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: Math.round(iconSize * 0.22),
              }}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <View style={{ height: 48 }} />

        <View className="items-center min-h-[96px] justify-start">
          <Text
            style={{
              fontFamily: 'Outfit_900Black',
              fontSize: titleFontSize,
              letterSpacing: -1.2,
              minHeight: titleFontSize * 1.2,
            }}
            className="text-slate-900 tracking-tight text-center"
          >
            {medPart}
            <Text className="text-emerald-700">{nearPart}</Text>
          </Text>

          <Animated.View
            style={{
              opacity: subtextOpacityAnim,
              transform: [{ translateY: subtextTranslateYAnim }],
            }}
            className="items-center"
          >
            <Text
              style={{
                fontFamily: 'Outfit_600SemiBold',
                fontSize: width < 375 ? 14 : 16,
                letterSpacing: 0.6,
              }}
              className="text-slate-400 mt-2 text-center"
            >
              Search • Reserve • Pick Up
            </Text>
          </Animated.View>
        </View>
      </View>

      <View className="items-center mb-4">
        <ActivityIndicator size="small" color="#047857" />
      </View>
    </View>
  );
};
