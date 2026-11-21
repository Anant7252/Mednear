import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  LogOut,
  ChevronRight,
  MapPin,
  Heart,
  FileText,
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <StatusBar style="dark" />
      <View className="px-6 pt-4 pb-3 bg-white border-b border-slate-100">
        <Text className="text-2xl font-black text-slate-900 tracking-tight">
          My Account
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View className="bg-white rounded-3xl p-5 mb-5 border border-slate-200/80 shadow-xs flex-row items-center">
          <View className="w-16 h-16 rounded-3xl bg-emerald-700 items-center justify-center mr-4 shadow-sm">
            <Text className="text-white text-xl font-black">
              {user?.email ? user.email.slice(0, 2).toUpperCase() : 'ME'}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-black text-slate-900 tracking-tight">
              {user?.email ? user.email.split('@')[0] : 'MedNear Member'}
            </Text>
            <Text className="text-xs font-semibold text-slate-400 mt-0.5">
              {user?.email}
            </Text>
            <View className="bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 self-start mt-2 flex-row items-center">
              <ShieldCheck size={12} color="#059669" />
              <Text className="text-emerald-700 text-[10px] font-black uppercase ml-1">
                Verified Customer
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-4 mb-5 border border-slate-200/80 shadow-xs space-y-1">
          <View className="flex-row items-center justify-between p-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-2xl bg-emerald-50 items-center justify-center mr-3 border border-emerald-100">
                <MapPin size={18} color="#059669" />
              </View>
              <Text className="text-sm font-bold text-slate-800">
                Saved Addresses
              </Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </View>

          <View className="flex-row items-center justify-between p-3 border-b border-slate-100">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-2xl bg-rose-50 items-center justify-center mr-3 border border-rose-100">
                <Heart size={18} color="#e11d48" />
              </View>
              <Text className="text-sm font-bold text-slate-800">
                Favorite Pharmacies
              </Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </View>

          <View className="flex-row items-center justify-between p-3">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-2xl bg-blue-50 items-center justify-center mr-3 border border-blue-100">
                <FileText size={18} color="#2563eb" />
              </View>
              <Text className="text-sm font-bold text-slate-800">
                Prescription History
              </Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </View>
        </View>

        <TouchableOpacity
          onPress={logout}
          activeOpacity={0.8}
          className="bg-white border border-rose-200 p-4 rounded-2xl flex-row items-center justify-center shadow-xs"
        >
          <LogOut size={18} color="#e11d48" />
          <Text className="text-rose-600 font-extrabold text-sm ml-2">
            Log Out of MedNear
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
