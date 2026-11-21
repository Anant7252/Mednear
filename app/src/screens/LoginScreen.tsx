import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { GoogleLogo, AppleLogo } from '../components/SocialLogos';
import { AmbientBackground } from '../components/AmbientBackground';
import { CurvedBottomBorder } from '../components/CurvedBottomBorder';

export const LoginScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { login } = useAuth();
  const { width } = useWindowDimensions();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const cleanEmail = email.trim();
      try {
        await login(cleanEmail, password);
        navigation.replace('Home');
      } catch (firstErr: any) {
        if (cleanEmail !== cleanEmail.toLowerCase()) {
          await login(cleanEmail.toLowerCase(), password);
          navigation.replace('Home');
        } else {
          throw firstErr;
        }
      }
    } catch (err: any) {
      const detail =
        err.response?.data?.detail || err.message || 'Invalid email or password. Please try again.';
      setErrorMessage(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative overflow-hidden">
      <StatusBar style="dark" />

      <AmbientBackground />

      <View className="px-6 pt-3 pb-2 flex-row items-center">
        <TouchableOpacity
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Welcome'))}
          activeOpacity={0.6}
          className="w-12 h-12 rounded-full bg-slate-50/90 border border-slate-200 items-center justify-center shadow-sm"
        >
          <ArrowLeft size={26} color="#0f172a" strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === 'ios' ? 24 : 64}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: width < 375 ? 20 : 28, paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center my-3">
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              shadowColor: '#047857',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.16,
              shadowRadius: 14,
              elevation: 8,
            }}
            className="bg-white rounded-2xl items-center justify-center mb-2.5 border border-emerald-500/10"
          >
            <Image
              source={require('../../assets/app_icon_clean.png')}
              style={{ width: 64, height: 64, borderRadius: 18 }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{ fontFamily: 'Outfit_900Black' }}
            className="text-2xl text-slate-900 tracking-tight"
          >
            Med<Text className="text-emerald-700">Near</Text>
          </Text>
          <Text
            style={{ fontFamily: 'Outfit_600SemiBold' }}
            className="text-slate-400 text-xs mt-0.5 tracking-wide"
          >
            Search • Reserve • Pick Up
          </Text>
        </View>

        <View className="mt-3 mb-5">
          <Text
            style={{ fontFamily: 'Outfit_800ExtraBold', fontSize: width < 375 ? 24 : 28 }}
            className="text-slate-900 tracking-tight"
          >
            Welcome Back 👋
          </Text>
          <Text
            style={{ fontFamily: 'PlusJakartaSans_500Medium' }}
            className="text-slate-500 text-sm mt-1"
          >
            Sign in to access nearby pharmacies and active reservations
          </Text>
        </View>

        {errorMessage && (
          <View className="flex-row items-center bg-rose-50 border border-rose-200 p-3.5 rounded-2xl mb-4">
            <AlertCircle size={18} color="#e11d48" />
            <Text
              style={{ fontFamily: 'PlusJakartaSans_600SemiBold' }}
              className="text-rose-700 text-xs ml-2.5 flex-1"
            >
              {errorMessage}
            </Text>
          </View>
        )}

        <View className="space-y-3.5 mb-4">
          <View
            style={{
              borderRadius: 16,
              backgroundColor: focusedField === 'email' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 transition-all"
          >
            <CurvedBottomBorder isFocused={focusedField === 'email'} />
            <View
              className={`w-8 h-8 rounded-xl items-center justify-center ${
                focusedField === 'email' ? 'bg-emerald-100/60' : 'bg-slate-100'
              }`}
            >
              <Mail size={17} color={focusedField === 'email' ? '#047857' : '#64748b'} />
            </View>
            <TextInput
              style={{
                fontFamily: 'PlusJakartaSans_500Medium',
                outlineStyle: 'none' as any,
              }}
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholder="Email address"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onChangeText={(val) => {
                setEmail(val);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </View>

          <View
            style={{
              borderRadius: 16,
              backgroundColor: focusedField === 'password' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 mt-3 transition-all"
          >
            <CurvedBottomBorder isFocused={focusedField === 'password'} />
            <View
              className={`w-8 h-8 rounded-xl items-center justify-center ${
                focusedField === 'password' ? 'bg-emerald-100/60' : 'bg-slate-100'
              }`}
            >
              <Lock size={17} color={focusedField === 'password' ? '#047857' : '#64748b'} />
            </View>
            <TextInput
              style={{
                fontFamily: 'PlusJakartaSans_500Medium',
                outlineStyle: 'none' as any,
              }}
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showPassword}
              value={password}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onChangeText={(val) => {
                setPassword(val);
                if (errorMessage) setErrorMessage(null);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.6}
              className="p-1.5"
            >
              {showPassword ? (
                <EyeOff size={18} color="#64748b" />
              ) : (
                <Eye size={18} color="#64748b" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-1 mb-5">
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
            className="flex-row items-center"
          >
            <View
              className={`w-5 h-5 rounded-md border items-center justify-center mr-2 transition-all ${
                rememberMe
                  ? 'bg-emerald-700 border-emerald-700'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {rememberMe && <Check size={13} color="#ffffff" strokeWidth={3} />}
            </View>
            <Text
              style={{ fontFamily: 'PlusJakartaSans_600SemiBold' }}
              className="text-slate-600 text-xs"
            >
              Remember Me
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
              className="text-emerald-700 text-xs"
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.88}
          className={`py-4 rounded-full items-center shadow-lg transition-all ${
            loading ? 'bg-emerald-500' : 'bg-emerald-700 shadow-emerald-700/25'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text
              style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
              className="text-white text-base tracking-wide"
            >
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center my-5">
          <View className="flex-1 h-[1px] bg-slate-200" />
          <Text
            style={{ fontFamily: 'PlusJakartaSans_600SemiBold' }}
            className="mx-3 text-slate-400 text-xs tracking-wide"
          >
            or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-slate-200" />
        </View>

        <View className="flex-row space-x-3 justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-1 py-3.5 rounded-2xl border border-slate-200/90 items-center justify-center bg-white flex-row shadow-sm mr-2"
          >
            <GoogleLogo size={20} />
            <Text
              style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
              className="text-slate-700 text-sm ml-2.5"
            >
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-1 py-3.5 rounded-2xl border border-slate-200/90 items-center justify-center bg-white flex-row shadow-sm ml-2"
          >
            <AppleLogo size={20} color="#0f172a" />
            <Text
              style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
              className="text-slate-700 text-sm ml-2.5"
            >
              Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-6">
          <Text
            style={{ fontFamily: 'PlusJakartaSans_500Medium' }}
            className="text-slate-500 text-xs"
          >
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.7}
          >
            <Text
              style={{ fontFamily: 'PlusJakartaSans_800ExtraBold' }}
              className="text-emerald-700 text-xs"
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <View className="flex-row items-center justify-center py-3 border-t border-slate-200/40 bg-transparent">
        <ShieldCheck size={13} color="#059669" />
        <Text
          style={{ fontFamily: 'PlusJakartaSans_500Medium' }}
          className="text-slate-400 text-[11px] ml-1.5"
        >
          256-Bit SSL Encrypted • Verified Healthcare Network
        </Text>
      </View>
    </SafeAreaView>
  );
};
