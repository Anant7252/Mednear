import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowRight } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';

const SLIDES = [
  {
    id: '1',
    title: 'Find Medicines\nNear You',
    description: 'Search, compare and reserve medicines in nearby pharmacies.',
    image: require('../../assets/onboarding_map_bottle_transparent.png'),
  },
  {
    id: '2',
    title: 'Check Stock\n& Compare Prices',
    description: 'Know availability, compare prices and save more.',
    image: require('../../assets/onboarding_pharmacy_store_transparent.png'),
  },
  {
    id: '3',
    title: 'Reserve &\nPick Up Easily',
    description: 'Reserve medicines for 30 minutes and pick them from nearby shops.',
    image: require('../../assets/onboarding_reservation_bag_clean.png'),
  },
];

export const WelcomeScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (!isFocused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % SLIDES.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, isFocused]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex >= 0 && slideIndex < SLIDES.length && slideIndex !== activeIndex) {
      setActiveIndex(slideIndex);
    }
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      navigation.navigate('Register');
    }
  };

  const imageSize = Math.min(width * 0.92, height * 0.44);
  const titleFontSize = width < 375 ? 28 : width > 410 ? 36 : 33;
  const descFontSize = width < 375 ? 14 : 15;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row justify-end px-7 pt-2 pb-1">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.6}
          className="py-1.5 px-3"
        >
          <Text
            style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
            className="text-slate-400 text-sm tracking-wide"
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 px-8 items-center justify-between py-2">
            <View className="w-full flex-1 items-center justify-center">
              <View className="w-full items-center justify-center" style={{ height: imageSize }}>
                <Image
                  source={item.image}
                  style={{ width: imageSize, height: imageSize }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  fontFamily: 'Outfit_800ExtraBold',
                  fontSize: titleFontSize,
                  lineHeight: titleFontSize * 1.18,
                }}
                className="text-slate-900 text-center tracking-tight mt-6 mb-3"
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontFamily: 'PlusJakartaSans_500Medium',
                  fontSize: descFontSize,
                  lineHeight: descFontSize * 1.5,
                }}
                className="text-slate-500 text-center px-4"
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      <View className="px-8" style={{ paddingBottom: height > 800 ? 36 : 20, paddingTop: 8 }}>
        <View className="flex-row justify-center items-center mb-8">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`rounded-full mx-1 transition-all ${
                index === activeIndex
                  ? 'w-8 h-2.5 bg-emerald-700'
                  : 'w-2.5 h-2.5 bg-slate-200'
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.88}
          className="bg-emerald-700 py-4 rounded-full flex-row items-center justify-center shadow-xl shadow-emerald-700/35"
        >
          <Text
            style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
            className="text-white text-base mr-2 tracking-wide"
          >
            {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ArrowRight size={19} color="#ffffff" strokeWidth={2.6} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
