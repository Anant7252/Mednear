import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronRight,
  Clock,
  ShieldCheck,
  Pill,
  Upload,
  Sparkles,
  Store,
  Bell,
  CheckCircle2,
  ArrowRight,
  Plus,
  Home,
  FileText,
  User,
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const QUICK_CATEGORIES = [
  {
    id: '1',
    title: 'Cold & Flu',
    query: 'Ascoril LS',
    bgColor: '#dbeafe',
    iconEmoji: '🧴',
  },
  {
    id: '2',
    title: 'Pain Relief',
    query: 'Dolo 650',
    bgColor: '#d1fae5',
    iconEmoji: '💊',
  },
  {
    id: '3',
    title: 'Antibiotics',
    query: 'Augmentin 625',
    bgColor: '#ffedd5',
    iconEmoji: '💊',
  },
  {
    id: '4',
    title: 'Diabetes',
    query: 'Metformin',
    bgColor: '#ede9fe',
    iconEmoji: '🩸',
  },
  {
    id: '5',
    title: 'Cardiac',
    query: 'Atorvastatin',
    bgColor: '#fee2e2',
    iconEmoji: '❤️',
  },
  {
    id: '6',
    title: 'Vitamins',
    query: 'Zincovit',
    bgColor: '#fef3c7',
    iconEmoji: '✨',
  },
];

const NEARBY_PHARMACIES = [
  {
    id: '1',
    name: 'Apollo Pharmacy',
    location: 'Connaught Circle, Block A',
    distance: '0.4 km',
    openUntil: 'Open 24/7',
    matchRate: '98% Stock Match',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'MedPlus Chemist',
    location: 'Barakhamba Road',
    distance: '0.7 km',
    openUntil: 'Open till 11:30 PM',
    matchRate: '94% Stock Match',
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Wellness Forever',
    location: 'Janpath Lane',
    distance: '1.2 km',
    openUntil: 'Open 24/7',
    matchRate: '91% Stock Match',
    rating: 4.7,
  },
];

const TRENDING_MEDICINES = [
  {
    id: '1',
    name: 'Augmentin 625 Duo',
    salt: 'Amoxycillin & Potassium Clavulanate',
    price: 189,
    mrp: 223,
    is_rx: true,
    pharmacy: 'Apollo Pharmacy',
    distance: '0.4 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/wy2y9bdipmh6rgkrj0zm.jpg',
  },
  {
    id: '2',
    name: 'Dolo 650 Tablet',
    salt: 'Paracetamol (650mg)',
    price: 32,
    mrp: 34,
    is_rx: false,
    pharmacy: 'MedPlus Chemist',
    distance: '0.7 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg',
  },
  {
    id: '3',
    name: 'Azithral 500 Tablet',
    salt: 'Azithromycin (500mg)',
    price: 119,
    mrp: 132,
    is_rx: true,
    pharmacy: 'Apollo Pharmacy',
    distance: '0.4 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg',
  },
  {
    id: '4',
    name: 'Ascoril LS Syrup',
    salt: 'Ambroxol + Levosalbutamol',
    price: 99,
    mrp: 118,
    is_rx: false,
    pharmacy: 'Wellness Forever',
    distance: '1.2 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/3205599cc49d4073ae66cbb0dbfded86.jpg',
  },
];

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'orders' | 'profile'>('home');

  const navigateToSearch = (initialQuery?: string) => {
    navigation.navigate('Search', { query: initialQuery || '' });
  };

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={['#a7f3d0', '#a7f3d0', '#d1fae5', '#f0fdf4', '#ffffff']}
        locations={[0, 0.44, 0.64, 0.84, 1.0]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 440,
        }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <StatusBar style="dark" />

        <View className="px-5 pt-3 pb-3">
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity activeOpacity={0.8} className="flex-row items-center flex-1 pr-3">
              <View className="w-10 h-10 rounded-2xl bg-white shadow-xs items-center justify-center mr-3 border border-emerald-100">
                <MapPin size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="text-sm font-black text-slate-900 tracking-tight">
                    Deliver to Home
                  </Text>
                  <ChevronDown size={14} color="#059669" className="ml-1" />
                </View>
                <Text numberOfLines={1} className="text-xs font-semibold text-slate-500 mt-0.5">
                  Connaught Place, New Delhi • 4th Block
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center space-x-2">
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-10 h-10 rounded-2xl bg-white shadow-xs items-center justify-center border border-emerald-100 mr-2 relative"
              >
                <Bell size={18} color="#0f172a" />
                <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('profile')}
                className="w-10 h-10 rounded-2xl bg-emerald-700 items-center justify-center shadow-xs"
              >
                <Text className="text-white text-xs font-black">
                  {user?.email ? user.email.slice(0, 2).toUpperCase() : 'ME'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigateToSearch()}
            activeOpacity={0.9}
            className="bg-white rounded-full flex-row items-center px-4 py-3.5 shadow-md shadow-emerald-950/5 border border-emerald-100"
          >
            <Search size={20} color="#059669" />
            <Text className="flex-1 ml-3 text-slate-400 font-medium text-sm">
              Search 11,800+ medicines, salts...
            </Text>
            <View className="w-8 h-8 rounded-full bg-emerald-50 items-center justify-center">
              <Sparkles size={16} color="#059669" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="bg-emerald-800 rounded-3xl p-5 shadow-lg shadow-emerald-950/20 mb-6 overflow-hidden relative">
            <View className="flex-row items-center justify-between mb-3">
              <View className="bg-emerald-700/80 px-3 py-1 rounded-full flex-row items-center">
                <Clock size={12} color="#a7f3d0" />
                <Text className="text-emerald-100 text-[11px] font-black uppercase tracking-wider ml-1.5">
                  30-Min Hold Guarantee
                </Text>
              </View>
              <View className="bg-emerald-900/60 px-2.5 py-1 rounded-full">
                <Text className="text-emerald-200 text-[11px] font-bold">
                  14 Chemist Shops Live
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-white text-xl font-black leading-tight tracking-tight mb-1.5">
                  Need Medicine Fast?
                </Text>
                <Text className="text-emerald-100 text-xs font-medium leading-relaxed mb-3.5">
                  Check live shelf stock within 3km & hold it for 30 mins before leaving home.
                </Text>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigateToSearch()}
                  className="bg-white px-4 py-2.5 rounded-full flex-row items-center self-start shadow-sm"
                >
                  <Text className="text-emerald-900 font-black text-xs mr-1.5">
                    Locate Medicine
                  </Text>
                  <ArrowRight size={14} color="#064e3b" />
                </TouchableOpacity>
              </View>

              <Image
                source={require('../../assets/onboarding_reservation_bag_clean.png')}
                style={{ width: 85, height: 85 }}
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-slate-900 font-black text-lg tracking-tight">
              Browse by Category
            </Text>
            <TouchableOpacity onPress={() => navigateToSearch()}>
              <Text className="text-emerald-700 font-extrabold text-xs">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5 mb-6"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {QUICK_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => navigateToSearch(cat.query)}
                activeOpacity={0.85}
                style={{ backgroundColor: cat.bgColor }}
                className="w-24 h-28 rounded-3xl p-3 mr-3 items-center justify-between shadow-2xs"
              >
                <View className="w-12 h-12 rounded-2xl bg-white/70 items-center justify-center mt-1">
                  <Text className="text-2xl">{cat.iconEmoji}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  className="text-slate-800 font-extrabold text-xs text-center tracking-tight"
                >
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigateToSearch()}
            className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 flex-row items-center justify-between"
          >
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-12 h-12 rounded-2xl bg-emerald-100 items-center justify-center mr-3.5">
                <Upload size={22} color="#047857" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-black text-sm">
                  Upload Doctor's Prescription
                </Text>
                <Text className="text-slate-500 font-medium text-xs mt-0.5">
                  Chemist reads Rx & reserves correct dosage
                </Text>
              </View>
            </View>
            <View className="bg-emerald-600 px-3 py-2 rounded-xl">
              <Text className="text-white font-extrabold text-xs">
                Upload Rx
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Text className="text-slate-900 font-black text-lg tracking-tight">
                Live Chemist Radar
              </Text>
              <View className="w-2 h-2 rounded-full bg-emerald-500 ml-2" />
            </View>
            <Text className="text-slate-400 font-bold text-xs">
              Within 3 km
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5 mb-6"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {NEARBY_PHARMACIES.map((pharmacy) => (
              <TouchableOpacity
                key={pharmacy.id}
                activeOpacity={0.9}
                onPress={() => navigateToSearch()}
                className="w-64 bg-white rounded-3xl p-4 mr-3.5 border border-slate-200/80 shadow-xs"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100">
                    <Store size={20} color="#059669" />
                  </View>
                  <View className="bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <Text className="text-emerald-700 text-[10px] font-black">
                      {pharmacy.matchRate}
                    </Text>
                  </View>
                </View>

                <Text className="text-slate-900 font-black text-base tracking-tight mb-0.5">
                  {pharmacy.name}
                </Text>
                <Text numberOfLines={1} className="text-slate-500 text-xs font-medium mb-3">
                  {pharmacy.location}
                </Text>

                <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-100">
                  <View className="flex-row items-center">
                    <MapPin size={13} color="#ea580c" />
                    <Text className="text-slate-700 text-xs font-bold ml-1">
                      {pharmacy.distance}
                    </Text>
                  </View>
                  <Text className="text-emerald-700 text-xs font-black">
                    {pharmacy.openUntil}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-slate-900 font-black text-lg tracking-tight">
              Emergency Fast Hold
            </Text>
            <TouchableOpacity onPress={() => navigateToSearch()}>
              <Text className="text-emerald-700 font-extrabold text-xs">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5 mb-4"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {TRENDING_MEDICINES.map((med) => (
              <View
                key={med.id}
                className="w-48 bg-white rounded-3xl p-3.5 mr-3.5 border border-slate-200/80 shadow-xs flex-col justify-between"
              >
                <View>
                  <View className="w-full h-28 bg-slate-50 rounded-2xl items-center justify-center mb-2.5 overflow-hidden">
                    <Image
                      source={{ uri: med.image_url }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    numberOfLines={1}
                    className="text-slate-900 font-black text-sm tracking-tight"
                  >
                    {med.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-slate-400 font-medium text-[11px] mb-2"
                  >
                    {med.salt}
                  </Text>
                </View>

                <View>
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-baseline">
                      <Text className="text-slate-900 font-black text-base">
                        ₹{med.price}
                      </Text>
                      <Text className="text-slate-400 text-[11px] line-through font-medium ml-1">
                        ₹{med.mrp}
                      </Text>
                    </View>
                    {med.is_rx && (
                      <View className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <Text className="text-amber-700 text-[9px] font-black uppercase">
                          Rx
                        </Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row items-center mb-2.5">
                    <Store size={11} color="#64748b" />
                    <Text numberOfLines={1} className="text-slate-500 text-[10px] font-medium ml-1 flex-1">
                      {med.pharmacy} • {med.distance}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => navigateToSearch(med.name)}
                    className="bg-emerald-600 py-2 rounded-xl items-center shadow-xs"
                  >
                    <Text className="text-white text-xs font-black">
                      Hold 30m
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
