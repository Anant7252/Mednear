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
  User,
  Phone,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { AmbientBackground } from '../components/AmbientBackground';
import { CurvedBottomBorder } from '../components/CurvedBottomBorder';

export const RegisterScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register } = useAuth();
  const { width } = useWindowDimensions();

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      await register({
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim() || null,
        role: 'customer',
      });
      navigation.replace('Home');
    } catch (err: any) {
      const detail =
        err.response?.data?.detail || err.message || 'Registration failed. Please try again.';
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
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: width < 375 ? 20 : 28, paddingBottom: 40 }}
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
        </View>

        <View className="mt-2 mb-5">
          <Text
            style={{ fontFamily: 'Outfit_800ExtraBold', fontSize: width < 375 ? 24 : 28 }}
            className="text-slate-900 tracking-tight"
          >
            Create Your Account
          </Text>
          <Text
            style={{ fontFamily: 'PlusJakartaSans_500Medium' }}
            className="text-slate-500 text-xs mt-1"
          >
            Join MedNear to reserve medicines at nearby pharmacies in real-time
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

        <View className="space-y-3.5 mb-6">
          <View
            style={{
              borderRadius: 16,
              backgroundColor: focusedField === 'name' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 transition-all"
          >
            <CurvedBottomBorder isFocused={focusedField === 'name'} />
            <View
              className={`w-8 h-8 rounded-xl items-center justify-center ${
                focusedField === 'name' ? 'bg-emerald-100/60' : 'bg-slate-100'
              }`}
            >
              <User size={17} color={focusedField === 'name' ? '#047857' : '#64748b'} />
            </View>
            <TextInput
              style={{
                fontFamily: 'PlusJakartaSans_500Medium',
                outlineStyle: 'none' as any,
              }}
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholder="Full Name"
              placeholderTextColor="#94a3b8"
              value={fullName}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setFullName}
            />
          </View>

          <View
            style={{
              borderRadius: 16,
              backgroundColor: focusedField === 'email' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 mt-3 transition-all"
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
              placeholder="Email Address"
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
              backgroundColor: focusedField === 'phone' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 mt-3 transition-all"
          >
            <CurvedBottomBorder isFocused={focusedField === 'phone'} />
            <View
              className={`w-8 h-8 rounded-xl items-center justify-center ${
                focusedField === 'phone' ? 'bg-emerald-100/60' : 'bg-slate-100'
              }`}
            >
              <Phone size={17} color={focusedField === 'phone' ? '#047857' : '#64748b'} />
            </View>
            <TextInput
              style={{
                fontFamily: 'PlusJakartaSans_500Medium',
                outlineStyle: 'none' as any,
              }}
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholder="Phone Number (optional)"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={phone}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setPhone}
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

          <View
            style={{
              borderRadius: 16,
              backgroundColor: focusedField === 'confirm' ? 'rgba(236, 253, 245, 0.7)' : 'rgba(248, 250, 252, 0.85)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="flex-row items-center px-4 py-3.5 mt-3 transition-all"
          >
            <CurvedBottomBorder isFocused={focusedField === 'confirm'} />
            <View
              className={`w-8 h-8 rounded-xl items-center justify-center ${
                focusedField === 'confirm' ? 'bg-emerald-100/60' : 'bg-slate-100'
              }`}
            >
              <Lock size={17} color={focusedField === 'confirm' ? '#047857' : '#64748b'} />
            </View>
            <TextInput
              style={{
                fontFamily: 'PlusJakartaSans_500Medium',
                outlineStyle: 'none' as any,
              }}
              className="flex-1 ml-3 text-slate-900 text-base"
              placeholder="Confirm Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onFocus={() => setFocusedField('confirm')}
              onBlur={() => setFocusedField(null)}
              onChangeText={(val) => {
                setConfirmPassword(val);
                if (errorMessage) setErrorMessage(null);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              activeOpacity={0.6}
              className="p-1.5"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} color="#64748b" />
              ) : (
                <Eye size={18} color="#64748b" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
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
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-6">
          <Text
            style={{ fontFamily: 'PlusJakartaSans_500Medium' }}
            className="text-slate-500 text-xs"
          >
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text
              style={{ fontFamily: 'PlusJakartaSans_800ExtraBold' }}
              className="text-emerald-700 text-xs"
            >
              Sign In
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
