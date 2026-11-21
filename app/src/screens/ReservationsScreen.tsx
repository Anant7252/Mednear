import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Clock, ArrowRight, ShieldCheck } from 'lucide-react-native';

export const ReservationsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar style="dark" />
      <View className="px-6 pt-4 pb-3 border-b border-slate-100 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-black text-slate-900 tracking-tight">
            My Holds
          </Text>
          <Text className="text-xs font-semibold text-slate-400 mt-0.5">
            Active 30-minute pharmacy reservations
          </Text>
        </View>
        <View className="w-9 h-9 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100">
          <Clock size={18} color="#059669" />
        </View>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 rounded-3xl bg-emerald-50 items-center justify-center mb-5 border border-emerald-100">
          <Clock size={40} color="#059669" />
        </View>

        <Text className="text-xl font-black text-slate-900 text-center tracking-tight mb-2">
          No Active Reservations
        </Text>
        <Text className="text-slate-500 font-medium text-sm text-center leading-relaxed mb-6">
          When you hold a medicine at a partner chemist shop, your 30-minute pickup countdown will appear here live.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Search')}
          className="bg-emerald-600 px-6 py-3.5 rounded-2xl flex-row items-center shadow-lg shadow-emerald-700/25"
        >
          <Text className="text-white font-black text-sm mr-2">
            Find Medicines Nearby
          </Text>
          <ArrowRight size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
