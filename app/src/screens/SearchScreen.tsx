import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Ellipse,
} from 'react-native-svg';
import {
  Search,
  Mic,
  MapPin,
  ChevronDown,
  X,
  Pill,
  Clock,
  ShieldCheck,
  Store,
  ArrowRight,
  Sparkles,
} from 'lucide-react-native';
import { apiClient } from '../api/client';

const CATEGORIES = [
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
];

const RECENT_SEARCHES = [
  'Paracetamol 650',
  'Amoxicillin',
  'Azithromycin',
  'Dolo 650',
  'Augmentin 625',
];

const MEDICINES_DATA = [
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
    name: 'Azithral 500 Tablet',
    salt: 'Azithromycin (500mg)',
    price: 119,
    mrp: 132,
    is_rx: true,
    pharmacy: 'MedPlus Chemist',
    distance: '0.2 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg',
  },
  {
    id: '3',
    name: 'Ascoril LS Syrup',
    salt: 'Ambroxol + Levosalbutamol',
    price: 99,
    mrp: 118,
    is_rx: false,
    pharmacy: 'City Care Medicos',
    distance: '0.8 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/3205599cc49d4073ae66cbb0dbfded86.jpg',
  },
  {
    id: '4',
    name: 'Aciloc 150 Tablet',
    salt: 'Ranitidine (150mg)',
    price: 42,
    mrp: 50,
    is_rx: false,
    pharmacy: 'Apollo Pharmacy',
    distance: '0.4 km',
    image_url:
      'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg',
  },
];

function MedNearCrossLogo() {
  return (
    <Svg width={30} height={30} viewBox="0 0 44 44" fill="none">
      <Path
        d="M22 6V38"
        stroke="#059669"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <Path
        d="M6 22H38"
        stroke="#059669"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <Path
        d="M10 22H16L19 16L24 28L27 22H34"
        stroke="#ffffff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function FloatingCapsuleLoader({ query }: { query: string }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 0.85,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-22, -4],
  });

  const tilt = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['16deg', '24deg'],
  });

  const shadowScaleX = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.18],
  });

  const shadowScaleY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1.1],
  });

  const shadowOpacity = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.38, 0.88],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <ScrollView
      className="flex-1 px-5 pt-2"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 110 }}
    >
      <View className="w-44 h-44 items-center justify-center relative mt-1 mb-1">
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 6,
            opacity: shadowOpacity,
            transform: [
              { translateX: -6 },
              { scaleX: shadowScaleX },
              { scaleY: shadowScaleY },
            ],
          }}
        >
          <Svg width={110} height={26} viewBox="0 0 110 26" fill="none">
            <Defs>
              <RadialGradient
                id="pillShadowPenumbra"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"
              >
                <Stop offset="0%" stopColor="#0f172a" stopOpacity={0.25} />
                <Stop offset="35%" stopColor="#0f172a" stopOpacity={0.12} />
                <Stop offset="70%" stopColor="#0f172a" stopOpacity={0.03} />
                <Stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
              </RadialGradient>
              <RadialGradient
                id="pillShadowUmbra"
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%"
                fx="50%"
                fy="50%"
              >
                <Stop offset="0%" stopColor="#0f172a" stopOpacity={0.4} />
                <Stop offset="45%" stopColor="#0f172a" stopOpacity={0.18} />
                <Stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Ellipse cx={55} cy={13} rx={48} ry={10} fill="url(#pillShadowPenumbra)" />
            <Ellipse cx={55} cy={13} rx={24} ry={5} fill="url(#pillShadowUmbra)" />
          </Svg>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ translateY }, { rotate: tilt }],
          }}
        >
          <Svg width={120} height={130} viewBox="0 0 120 130" fill="none">
            <Defs>
              <SvgLinearGradient id="capsuleEmerald" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#34d399" />
                <Stop offset="25%" stopColor="#10b981" />
                <Stop offset="70%" stopColor="#059669" />
                <Stop offset="100%" stopColor="#047857" />
              </SvgLinearGradient>
              <SvgLinearGradient id="capsuleWhite" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0%" stopColor="#ffffff" />
                <Stop offset="30%" stopColor="#f8fafc" />
                <Stop offset="75%" stopColor="#e2e8f0" />
                <Stop offset="100%" stopColor="#cbd5e1" />
              </SvgLinearGradient>
            </Defs>

            <Path
              d="M 34 60 V 40 C 34 20 45 8 60 8 C 75 8 86 20 86 40 V 60 Z"
              fill="url(#capsuleEmerald)"
            />

            <Path
              d="M 40 18 C 45 12 52 10 57 10 C 55 14 49 18 45 23 C 42 28 41 40 41 48 C 38 48 37 42 37 34 C 37 26 38 20 40 18 Z"
              fill="#ffffff"
              opacity={0.6}
            />

            <Rect x={58} y={31} width={4} height={16} rx={2} fill="#ffffff" opacity={0.95} />
            <Rect x={52} y={37} width={16} height={4} rx={2} fill="#ffffff" opacity={0.95} />

            <Rect x={33} y={59} width={54} height={3} rx={1.5} fill="#94a3b8" opacity={0.75} />

            <Path
              d="M 34 61.5 V 84 C 34 104 45 116 60 116 C 75 116 86 104 86 84 V 61.5 Z"
              fill="url(#capsuleWhite)"
            />

            <Path
              d="M 40 68 V 86 C 40 96 46 105 53 109 C 49 104 45 96 45 86 V 68 Z"
              fill="#ffffff"
              opacity={0.8}
            />
          </Svg>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 8,
            right: 16,
            opacity: sparkleOpacity,
            transform: [{ scale: sparkleScale }],
          }}
        >
          <Sparkles size={20} color="#f59e0b" />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 55,
            left: 10,
            opacity: sparkleOpacity,
            transform: [{ scale: sparkleScale }],
          }}
        >
          <Sparkles size={16} color="#059669" />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 24,
            right: 14,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#10b981',
            opacity: sparkleOpacity,
            transform: [{ scale: sparkleScale }],
          }}
        />
      </View>

      <Text className="text-xl font-black text-slate-900 tracking-tight text-center">
        Scanning Pharmacies...
      </Text>

      <View className="flex-row items-center bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 mt-2">
        <Sparkles size={13} color="#059669" />
        <Text className="text-xs font-bold text-emerald-800 ml-1.5">
          Checking 11,825 medicines for "{query}"
        </Text>
      </View>

      <Text className="text-xs text-slate-400 font-medium mt-2 text-center">
        Verifying live stock & 30-minute hold availability
      </Text>

      <Animated.View style={{ opacity: shimmerAnim }} className="w-full mt-6">
        <View className="bg-white rounded-3xl p-4 mb-3 border border-slate-100 flex-row items-center shadow-2xs">
          <View className="w-20 h-20 bg-slate-100 rounded-2xl mr-3.5 items-center justify-center border border-slate-200/60">
            <Pill size={26} color="#cbd5e1" />
          </View>
          <View className="flex-1">
            <View className="h-4 bg-slate-200 rounded-md w-3/4 mb-2" />
            <View className="h-3 bg-slate-100 rounded-md w-1/2 mb-3" />
            <View className="flex-row items-center justify-between">
              <View className="h-5 bg-slate-200 rounded-md w-16" />
              <View className="h-7 bg-emerald-100 rounded-full w-24" />
            </View>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-4 mb-3 border border-slate-100 flex-row items-center shadow-2xs">
          <View className="w-20 h-20 bg-slate-100 rounded-2xl mr-3.5 items-center justify-center border border-slate-200/60">
            <Pill size={26} color="#cbd5e1" />
          </View>
          <View className="flex-1">
            <View className="h-4 bg-slate-200 rounded-md w-3/4 mb-2" />
            <View className="h-3 bg-slate-100 rounded-md w-1/2 mb-3" />
            <View className="flex-row items-center justify-between">
              <View className="h-5 bg-slate-200 rounded-md w-16" />
              <View className="h-7 bg-emerald-100 rounded-full w-24" />
            </View>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-4 mb-3 border border-slate-100 flex-row items-center shadow-2xs">
          <View className="w-20 h-20 bg-slate-100 rounded-2xl mr-3.5 items-center justify-center border border-slate-200/60">
            <Pill size={26} color="#cbd5e1" />
          </View>
          <View className="flex-1">
            <View className="h-4 bg-slate-200 rounded-md w-3/4 mb-2" />
            <View className="h-3 bg-slate-100 rounded-md w-1/2 mb-3" />
            <View className="flex-row items-center justify-between">
              <View className="h-5 bg-slate-200 rounded-md w-16" />
              <View className="h-7 bg-emerald-100 rounded-full w-24" />
            </View>
          </View>
        </View>


        <View className="bg-white rounded-3xl p-4 border border-slate-100 flex-row items-center shadow-2xs">
          <View className="w-20 h-20 bg-slate-100 rounded-2xl mr-3.5 items-center justify-center border border-slate-200/60">
            <Pill size={26} color="#cbd5e1" />
          </View>
          <View className="flex-1">
            <View className="h-4 bg-slate-200 rounded-md w-2/3 mb-2" />
            <View className="h-3 bg-slate-100 rounded-md w-2/5 mb-3" />
            <View className="flex-row items-center justify-between">
              <View className="h-5 bg-slate-200 rounded-md w-14" />
              <View className="h-7 bg-emerald-100 rounded-full w-24" />
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

function EmptySearchResult({ query }: { query: string }) {
  return (
    <View className="flex-1 items-center justify-center pt-20 px-6">
      <View className="w-20 h-20 rounded-3xl bg-slate-100 items-center justify-center mb-4 border border-slate-200/80 shadow-xs">
        <Pill size={36} color="#94a3b8" />
      </View>
      <Text className="text-lg font-black text-slate-900 tracking-tight text-center">
        No exact match for "{query}"
      </Text>
      <Text className="text-xs text-slate-500 font-medium mt-1.5 text-center leading-relaxed max-w-[280px]">
        Try searching by active salt name (e.g. Paracetamol) or double-check the spelling.
      </Text>
    </View>
  );
}

export function SearchScreens({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleSearch = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      setSearching(true);
      setHasSearched(true);
      const res = await apiClient.get('/medicines/search', {
        params: { q: trimmed, page: 1, limit: 10 },
      });

      setSearchData(res.data.items || []);
    } catch (er) {
      console.error(er);
      setSearchData([]);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchData([]);
    setHasSearched(false);
    setSearching(false);
  };

  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={['#a7f3d0', '#a7f3d0', '#d1fae5', '#f0fdf4', '#ffffff']}
        locations={[0, 0.48, 0.68, 0.88, 1.0]}
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
            <View className="flex-row items-center">
              <MedNearCrossLogo />
              <Text className="text-2xl font-black text-slate-800 tracking-tight ml-2.5">
                MedNear
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} className="flex-row items-center">
              <MapPin size={15} color="#ea580c" />
              <View className="ml-1.5">
                <Text className="text-[10px] font-bold text-slate-400">
                  Deliver to:
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-xs font-black text-slate-800">
                    Home - 4th Block
                  </Text>
                  <ChevronDown size={13} color="#64748b" className="ml-0.5" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-full flex-row items-center px-4 py-3 shadow-md shadow-slate-200/60 border border-slate-100">
            <Search size={19} color="#059669" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search medicines, salts..."
              placeholderTextColor="#94a3b8"
              autoFocus={true}
              style={
                Platform.OS === 'web'
                  ? ({ outlineWidth: 0, outlineStyle: 'none' } as any)
                  : undefined
              }
              className="flex-1 ml-2.5 text-slate-900 font-semibold text-sm py-0.5"
              returnKeyType="search"
              onSubmitEditing={() => handleSearch(searchQuery)}
            />

            {searchQuery.length > 0 ? (
              <TouchableOpacity
                onPress={clearSearch}
                activeOpacity={0.7}
                className="w-5 h-5 rounded-full bg-slate-200 items-center justify-center mr-1"
              >
                <X size={12} color="#475569" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.7}>
                <Mic size={18} color="#475569" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {!hasSearched ? (
          <ScrollView
            className="flex-1 px-5 pt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 110 }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2 -mx-5 px-5 mb-6"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    setSearchQuery(cat.query);
                    handleSearch(cat.query);
                  }}
                  activeOpacity={0.85}
                  style={{ backgroundColor: cat.bgColor }}
                  className="w-24 h-28 rounded-3xl p-3 mr-3 items-center justify-between shadow-2xs"
                >
                  <View className="w-12 h-12 rounded-2xl bg-white/60 items-center justify-center mt-1">
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

            <Text className="text-slate-900 font-black text-lg tracking-tight mb-3">
              Recently Searched
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-5 px-5 mb-6"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {RECENT_SEARCHES.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setSearchQuery(item);
                    handleSearch(item);
                  }}
                  activeOpacity={0.7}
                  className="bg-white border border-slate-200/90 rounded-full px-4 py-2 mr-2.5 shadow-2xs"
                >
                  <Text className="text-xs font-bold text-slate-700">{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-slate-900 font-black text-lg tracking-tight mb-3">
              Nearby In-Stock
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-5 px-5"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {MEDICINES_DATA.map((item) => {
                const hasFailed = imageErrors[item.id] || !item.image_url;

                return (
                  <View
                    key={item.id}
                    className="w-48 bg-white rounded-3xl p-3.5 mr-3.5 border border-slate-100 shadow-sm shadow-slate-200/60"
                  >
                    <View className="w-full h-28 bg-slate-50/80 rounded-2xl items-center justify-center p-2 mb-2.5">
                      {hasFailed ? (
                        <Pill size={36} color="#059669" />
                      ) : (
                        <Image
                          source={{ uri: item.image_url }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="contain"
                          onError={() => handleImageError(item.id)}
                        />
                      )}
                    </View>

                    <Text
                      numberOfLines={1}
                      className="text-slate-900 font-black text-sm tracking-tight"
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-[11px] text-slate-500 font-medium mt-0.5"
                    >
                      {item.salt}
                    </Text>

                    <View className="flex-row items-center justify-between mt-2.5">
                      <Text className="text-slate-900 font-black text-base">
                        ₹{item.price}
                      </Text>
                      {item.is_rx ? (
                        <View className="bg-slate-100 px-2 py-0.5 rounded-md">
                          <Text className="text-[10px] font-bold text-slate-600">
                            Rx Required
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Text className="text-[10px] font-bold text-emerald-700">
                            OTC Safe
                          </Text>
                        </View>
                      )}
                    </View>

                    <View className="mt-2.5 bg-slate-100/80 rounded-xl px-2.5 py-1.5 flex-row items-center justify-center">
                      <Text numberOfLines={1} className="text-[10px] font-bold text-slate-600">
                        {item.pharmacy} • {item.distance}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="mt-3 bg-[#059669] py-2.5 rounded-full items-center justify-center shadow-xs"
                    >
                      <Text className="text-white text-xs font-black">
                        Hold 30m
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </ScrollView>
        ) : searching ? (
          <FloatingCapsuleLoader query={searchQuery} />
        ) : searchData.length === 0 ? (
          <EmptySearchResult query={searchQuery} />
        ) : (
          <FlatList
            data={searchData}
            keyExtractor={(item: any) => String(item.id)}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 110 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const hasFailed = imageErrors[String(item.id)] || !item.image_url;

              return (
                <View className="bg-white rounded-3xl p-4 mb-3.5 border border-slate-200/80 shadow-xs flex-row items-center">
                  <View className="w-20 h-20 bg-slate-50 rounded-2xl items-center justify-center p-2 mr-3.5 border border-slate-100">
                    {hasFailed ? (
                      <Pill size={28} color="#059669" />
                    ) : (
                      <Image
                        source={{ uri: item.image_url }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                        onError={() => handleImageError(String(item.id))}
                      />
                    )}
                  </View>

                  <View className="flex-1 pr-2">
                    <View className="flex-row items-center justify-between">
                      <Text
                        numberOfLines={1}
                        className="text-slate-900 font-black text-sm tracking-tight flex-1"
                      >
                        {item.name}
                      </Text>
                      {item.prescription_required ? (
                        <View className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200 ml-1">
                          <Text className="text-[9px] font-bold text-amber-800 uppercase">
                            Rx
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 ml-1">
                          <Text className="text-[9px] font-bold text-emerald-800 uppercase">
                            OTC
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text
                      numberOfLines={1}
                      className="text-slate-500 font-medium text-xs mt-0.5"
                    >
                      {item.generic_name || item.dosage || 'Standard Dosage'}
                    </Text>

                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-slate-900 font-black text-base">
                        ₹{item.mrp || 99}
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.85}
                        className="bg-emerald-600 px-3.5 py-1.5 rounded-full flex-row items-center shadow-xs"
                      >
                        <Clock size={11} color="#ffffff" />
                        <Text className="text-white font-black text-xs ml-1">
                          Hold 30m
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
